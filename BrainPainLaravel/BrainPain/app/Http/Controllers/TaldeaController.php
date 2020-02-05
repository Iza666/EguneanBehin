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

        $denak =DB::table('talde_partaideak')->join('taldeak', 'taldeak.id', '=', 'talde_partaideak.id_taldea')
        ->where('talde_partaideak.id_erabiltzailea', auth()->user()->id)->get();
        return response()->json($denak, 200);
    }
    //erabiltzaile batek sortutako taldeak lortzeko metodoa
    public function sortutakoTaldeaLortu(){
        $denak =DB::table('talde_partaideak')->join('taldeak', 'taldeak.id', '=', 'talde_partaideak.id_taldea')
        ->where('talde_partaideak.id_erabiltzailea', auth()->user()->id)->get();
        return response()->json($denak, 200);
    }
    
    //taldekide guztien puntuazioak hartzen ondoren printeatzeko
    public function taldekideDenaLortu(Request $request){
        $userPuntuak = DB::table('talde_partaideak')
                           ->join('users', 'users.id', '=', 'talde_partaideak.id_erabiltzailea')
                           ->join('taldeak', 'talde_partaideak.id_taldea', '=', 'taldeak.id')
                            ->join('partidak', 'talde_partaideak.id_erabiltzailea', '=', 'partidak.id_erabiltzailea', 'left outer')
                            ->select('users.id','users.erabiltzailea', 'users.argazkia', 'taldeak.izena', 'taldeak.token', DB::raw('sum(partidak.puntuak) as Totala'))
                            ->groupBy('users.id','users.erabiltzailea', 'users.argazkia', 'taldeak.izena', 'taldeak.token')->where('taldeak.izena', $request->taldeIzena)->orderBy('Totala', 'desc')
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
    //taldearen sortzailea den edo ez ikusteko
    public function isAdmin(Request $request){
        $taldea = DB::table('taldeak')->where('token', $request->token)->get();
        $sortzailea = $taldea[0]->sortzailea;
        $erabiltzailea = DB::table('users')->where('erabiltzailea',$sortzailea)->get();
        $eginda = false;
        if(sizeof($erabiltzailea) == 0){
            return response()->json($eginda, 200);
        }
        else{
            $eginda = true;
            return response()->json($eginda, 200);
        }
    }
    //erabiltzailea taldetik ezabatzeko
    public function ezabatuTaldetik(Request $request){
        DB::table('talde_partaideak')->where('id_erabiltzailea', $request->id)->delete();
            return response()->json(true, 200);
    }
    //token-arentzako random string-a sortzeko
    public function generateRandomString($length = 5) {
        $characters = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
        $charactersLength = strlen($characters);
        $randomString = '';
        for ($i = 0; $i < $length; $i++) {
            $randomString .= $characters[rand(0, $charactersLength - 1)];
        }
        return $randomString;
    }
}
