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
    
    public function create()
    {
    }

    public function store(Request $request)
    {
        //
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
    public function insertQuestion()
    {
        $postdata = file_get_contents("php://input");
        if (isset($postdata)) {
            $request = json_decode($postdata);
            echo $request->id_erabiltzailea;
            DB::table('erabiltzaile_galderak')->insert(
                ['id_erabiltzailea' => $request->id_erabiltzailea,
                 'id_galdera' => $request->id_galdera,
                 'id_partida' => $request->id_partida,
                 'erantzuna' => $request->erantzuna]
            );
        }
    }

    public function show($id)
    {
        //
    }

    public function edit($id)
    {
        //
    }

   
    public function update(Request $request, $id)
    {
        //
    }

    public function destroy($id)
    {
        //
    }
}
