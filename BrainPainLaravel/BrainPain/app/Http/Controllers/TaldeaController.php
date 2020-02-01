<?php

namespace App\Http\Controllers;

use App\Erabiltzaile_Galdera;
use Illuminate\Http\Request;
use App\Galdera;
use App\User;
use App\Partida;
use App\Taldea;
use App\Talde_partaideak;
use DB;
use Illuminate\Support\Facades\Auth;
use carbon;


class TaldeaController extends Controller
{
    //talde bat sortu pasatutako datuekin
    public function taldeaSortu(Request $request){
        $taldea = new Taldea();
        $taldea->izena = $request->izena;
        $taldea->sortzailea = auth()->user()->erabiltzailea;
        $token = TaldeaController::generateRandomString();  //token-a sortzeko
        $taldea->token = $token;
        $taldea->save();
        $sortutakoa = DB::table('taldeak')->where('token', $token)->get();

        $taldePartaide = new Talde_partaideak();
        $taldePartaide->id_taldea = $sortutakoa[0]->id;
        $taldePartaide->id_erabiltzailea = auth()->user()->id;
        $taldePartaide->save();

        $denak = Taldea::where('sortzailea', auth()->user()->erabiltzailea)->get();

        return response()->json($denak, 200);
    }
    //erabiltzaile batek sortutako taldeak lortzeko metodoa
    public function sortutakoTaldeaLortu(){
        $denak = DB::table('taldeak')->where('sortzailea', auth()->user()->erabiltzailea)->get();
        return response()->json($denak, 200);
    }
    //erabiltzaile baten taldeak lortzeko metodoa
    public function taldeakLortu(){
        $denak = DB::table('talde_partaideak')->join('taldeak', 'taldeak.id', '=', 'talde_partaideak.id_taldea')
                ->get();
                var_dump($denak);
        return response()->json($denak, 200);
    }
    //taldekide guztien puntuazioak hartzen ondoren printeatzeko
    public function taldekideDenaLortu(){
        $userPuntuak = DB::table('talde_partaideak')
                           ->join('users', 'users.id', '=', 'talde_partaideak.id_erabiltzailea')
                           ->join('taldeak', 'talde_partaideak.id_taldea', '=', 'taldeak.id')
                            ->join('partidak', 'talde_partaideak.id_erabiltzailea', '=', 'partidak.id_erabiltzailea', 'left outer')
                            ->select('users.erabiltzailea', 'taldeak.izena', 'taldeak.token', DB::raw('sum(partidak.puntuak) as Totala'))
                            ->groupBy('users.erabiltzailea', 'taldeak.izena', 'taldeak.token')->orderBy('Totala', 'desc')
                            ->get();
        return response()->json($userPuntuak, 200);
    }
    //taldekide bat sartzeko token batekin
    public function talderaSartu(Request $request){
        $taldea = DB::table('taldeak')->where('token', $request->token)->get();
        $eginda = false;
        if(sizeof($taldea) == 0){
            return response()->json($eginda, 200);
        }
        else{
            $taldePartaide = new Talde_partaideak();
            $taldePartaide->id_taldea = $taldea[0]->id;
            $taldePartaide->id_erabiltzailea = auth()->user()->id;
            $taldePartaide->save();
            $eginda = true;
            return response()->json($eginda, 200);
        }
                           
    }



/* 
        AURREKO METODOAK

    //erabiltzaile baten taldeak lortzeko metodoa
    public function taldeaLortu(){
        $denak = DB::table('taldeak')->where('sortzailea', auth()->user()->erabiltzailea)->get();
        return response()->json($denak, 200);

    }
    //talde bateko taldekideak lortzeko metodoa
    public function taldekideakLortu(Request $request){
        $taldea = DB::table('taldeak')->where('izena', $request->taldeIzena)->get();
        return response()->json($taldea, 200);
    }
    
    public function generateRandomString($length = 5) {
        $characters = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
        $charactersLength = strlen($characters);
        $randomString = '';
        for ($i = 0; $i < $length; $i++) {
            $randomString .= $characters[rand(0, $charactersLength - 1)];
        }
        return $randomString;
    } */

}
