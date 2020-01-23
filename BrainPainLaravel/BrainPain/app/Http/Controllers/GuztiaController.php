<?php

namespace App\Http\Controllers;

use App\Erabiltzaile_Galdera;
use Illuminate\Http\Request;
use App\Galdera;
use App\User;
use App\Partida;
use DB;
use Auth;


class GuztiaController extends Controller
{
    /* public function index()
    {
        $galdera = Galdera::orderByRaw("RAND()")->get()->take(1);
        //$erantzunRandom = DB::table('galderak')->0select('opt1_erantzuna', 'opt2', 'opt3')->where('id', $galdera->id);

        //echo $erantzunRandom;
        return response()->json($galdera, 200);
    } */
    public function GetRanking()
    {
        $sailkapena = DB::table('partidak')
            ->join('users', 'users.id', '=', 'partidak.id_erabiltzailea')
            ->select('id_erabiltzailea', 'users.id', 'users.erabiltzailea', DB::raw('sum(puntuak) as Totala'))
            ->groupBy('id_erabiltzailea', 'users.id', 'users.erabiltzailea')->get();

        return response()->json($sailkapena, 200);
    }
    //Galdera sartu BADABIL, partidak taularekin kombinatu behar da 
    public function insertQuestion(Request $request)
    {
        $Erabiltzaile_Galdera = new Erabiltzaile_Galdera();
        $Erabiltzaile_Galdera->id_erabiltzailea =  3;
        $Erabiltzaile_Galdera->id_galdera = $request->id_galdera;
        $Erabiltzaile_Galdera->id_partida = $request->idPartida;
        $Erabiltzaile_Galdera->erantzuna = $request->erantzuna;
        $Erabiltzaile_Galdera->save();

        $galdera = Galdera::orderByRaw("RAND()")->get()->take(1);
        $array = array(
            'idPartida' => $request->idPartida,
            'galdera' => $galdera
        );
        return response()->json($array, 200);
    }
    //Partida sartu CLAAAAAAAAAAVE
    public function insertMatch()
    {
        $Partida = new Partida();
        $Partida->id_erabiltzailea = auth()->user()->id;
        $Partida->save();
        $idPartida = $Partida->id;
        $galdera = Galdera::orderByRaw("RAND()")->get()->take(1);
        $array = array(
            'idPartida' => $idPartida,
            'galdera' => $galdera
        );
        return response()->json($array, 200);
    }
    //Profila aldatu PROVISIONAL
    public function changeProfile()
    {
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
    public function endedMatchInsert(Request $request)
    {
         /*$partidaa = DB::table('partidak')->
                       select(DB::raw("*"))->
                       where('id_erabiltzailea',auth()->user()->id)->
                       where('data',$request->d)->get(); */
        $denbora = explode(":", $request->zenbat_denbora);
        $minutuakSegundutan = floor($denbora[0] * 60);
        $totala = $minutuakSegundutan + $denbora[1];
        $puntuFinal = $request->puntuak / $totala;
        echo $request->idPartida;

        /* $partida = Partida::where('id_erabiltzailea', auth()->user()->id)->where('id', $request->idPartida)->first();
        $partida->puntuak = $puntuFinal; */
/* 
         DB::table('partidak')->where('id_erabiltzailea', 3)->where('data', $request->d)->update(['puntuak' => 9]); */

        /*  DB::table('partidak')->
                where('id_erabiltzailea',auth()->user()->id)->
                where('data',$request->d)->  
                update(['zenbat_zuzen'=>$request->zenbat_zuzen]);*/
            Partida::where('id_erabiltzailea',3)->
                where('data',$request->d)->    
                update(['zenbat_denbora'=>$request->zenbat_denbora]);   
    }
    //Erabiltzailearen datuak hartuko ditu login egiterakoan eta partidak taulan komparatuz, egun horretako 
    //data badu ezin izango du jolastu eta true edo false bueltatuko du
    public function dailyMatchController()
    {
        $postdata = file_get_contents("php://input");
        if (isset($postdata)) {
            $request = json_decode($postdata);
        }
    }
    public function getUser()
    {
        $user = auth()->user()->id;
    }

    /*


            JONARE

    public function getUserTaldea(Request $request) 
      {
         //$name = $request->input('name');
-        $user = $request->user();
+        //$user = $request->user();
        
-        $user = Auth::user();
+        $user = auth()->user()->id;
+
+        //$user2 = AuthController.user;
 
         //echo ($user);
          $userTaldea = DB::table('taldeak_user')->where('taldea_id','=','2')->get();


          */
}
