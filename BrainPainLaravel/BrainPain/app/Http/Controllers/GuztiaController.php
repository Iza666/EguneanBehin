<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Galdera;
use App\User;
use DB;

class GuztiaController extends Controller
{
    public function index()
    {
        $hamargaldera = Galdera::orderByRaw("RAND()")->get()->take(1);
        return response()->json($hamargaldera, 200);
    }
    public function GetRanking()
    {
        $sailkapena = DB::table('sailkapena')
        ->join('users',function($join){
            $join->on('sailkapena.id_erabiltzailea','=','users.id');
        })
        ->from('sailkapena')
        ->select('*')
        ->orderBy('sailkapena.puntuak','DESC')

        ->get();
        return response()->json($sailkapena, 200);
    }
    //Galdera sartu BADABIL, partidak taularekin kombinatu behar da 
    public function insertQuestion()
    {
        $postdata = file_get_contents("php://input");
        if (isset($postdata)) {
            $request = json_decode($postdata);
            DB::table('erabiltzaile_galderak')->insert(
                ['id_erabiltzailea' => $request->id_erabiltzailea,
                 'id_galdera' => $request->id_galdera,
                 'id_partida' => $request->id_partida,
                 'erantzuna' => $request->erantzuna]
            );
        }
    }
    //Partida sartu PROVISIONAL
    public function insertMatch()
    {
        $postdata = file_get_contents("php://input");
        if (isset($postdata)) {
            $request = json_decode($postdata);
            DB::table('partidak')->insert(
                ['id' => $request->id,
                 'id_erabiltzailea' => $request->id_erabiltzailea,
                 'data' => $request->data,
                 'puntuak' => $request->puntuak,
                 'zenbat_zuzen' => $request->zenbat_zuzen,
                 'zenbat_denbora' => $request->zenbat_denbora]
            );
        }
    }
    //Profila aldatu PROVISIONAL
    public function changeProfile(){
        $postdata = file_get_contents("php://input");
        if (isset($postdata)) {
            $request = json_decode($postdata);
            User::find($request->id)->update(
                [
                 'erabiltzailea' => $request->erabiltzailea,
                 'email' => $request->email,
                ]
            );
        }
    }
}
