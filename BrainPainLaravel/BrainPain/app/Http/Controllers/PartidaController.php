<?php

namespace App\Http\Controllers;

use App\Erabiltzaile_Galdera;
use Illuminate\Http\Request;
use App\Galdera;
use App\User;
use App\Partida;
use App\Taldea;
use DB;
use Illuminate\Support\Facades\Auth;
use carbon;

class PartidaController extends Controller
{
    //erabiltzaileak partida jokatuta duen arabera true edo false bueltatuko du
    public function GetJokatuta(Request $request)
    {
        $time = Carbon\Carbon::now();
        $date = $time->toDateTimeString();
        $eguna = explode(" ",$date);
        $user = auth()->user();
        $azkenPartida = DB::table('partidak')->select('data')->where('id_erabiltzailea', "=", $user->id)->orderBy('data', 'desc')->first();
        if($azkenPartida != null || $azkenPartida != NULL){
            if($eguna[0] == $azkenPartida->data){
                return response()->json(true, 200);
            }
            else{
                return response()->json(false, 200);
            }
        }
        else{
            return response()->json(false, 200);
        }
    }
    
    //galdera bakoitza erabiltzaile_galderak taulan sartzen du eta ondoren galdera random bat bueltatzen du
    public function insertQuestion(Request $request)
    {
        $Erabiltzaile_Galdera = new Erabiltzaile_Galdera();
        $Erabiltzaile_Galdera->id_erabiltzailea =  auth()->user()->id;
        $Erabiltzaile_Galdera->id_galdera = $request->id_galdera;
        $Erabiltzaile_Galdera->id_partida = $request->idPartida;
        $Erabiltzaile_Galdera->erantzuna = $request->erantzuna;
        $Erabiltzaile_Galdera->save();
      
        $galdera = DB::select('SELECT * FROM `galderak` where id not in (select id_galdera from erabiltzaile_galderak where id_erabiltzailea = ?) ORDER BY RAND() LIMIT 1',[auth()->user()->id]);
        $array = array(
            'idPartida' => $request->idPartida,
            'galdera' => $galdera
        );
        return response()->json($array, 200);
    }
    //Hasierako partida sortzen du
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
    //amaitutako partidaren datuak sartzen ditu
    public function endedMatchInsert(Request $request)
    {
        $denbora = explode(":", $request->zenbat_denbora);
        $minutuakSegundutan = floor($denbora[0] * 60);
        $totala = $minutuakSegundutan + $denbora[1];
        $puntuFinal = $request->puntuak / $totala;

        Partida::where('id_erabiltzailea', auth()->user()->id)->
            where('data',$request->d)->    
            update(['zenbat_denbora'=>$request->zenbat_denbora]);   
        Partida::where('id_erabiltzailea',auth()->user()->id)->
            where('data',$request->d)->    
            update(['puntuak'=>$puntuFinal]);
        Partida::where('id_erabiltzailea',auth()->user()->id)->
            where('data',$request->d)->    
            update(['zenbat_zuzen'=>$request->zenbat_zuzen]);
        return response()->json($puntuFinal, 200);

    }
    //partidak id-aren arabera + erabiltzaile horren datuak
    public function partidakLortu(){
        $denak = DB::table('partidak')->join('users', 'users.id', '=', 'partidak.id_erabiltzailea')->select('puntuak', 'users.erabiltzailea', 'data', 'zenbat_zuzen','zenbat_denbora')
        ->where('id_erabiltzailea', auth()->user()->id)->orderBy('data', 'desc')->get();
        return response()->json($denak, 200);

    }
}
