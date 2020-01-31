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
        $taldea->save();
        $sortutakoa = DB::table('taldeak')->where('izena', $request->izena)->get();

        $taldePartaide = new Talde_partaideak();
        $taldePartaide->id_taldea = $sortutakoa->id;
        $taldePartaide->id_erabiltzailea = auth()->user()->id;
        $taldePartaide->save();

        /* var_dump($sortutakoa);
        $zenbakia = $sortutakoa->id;
        DB::table('talde_partaideak')->insert(['id_taldea'=>$zenbakia, 'id_erabiltzailea' => auth()->user()->erabiltzailea]); */


        $denak = Taldea::where('sortzailea', auth()->user()->erabiltzailea)->get();

        return response()->json($denak, 200);
    }
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
    //taldekide guztien puntuazioak hartzen ondoren printeatzeko
    public function taldekidePuntuakLortu(Request $request){
        $usersPuntuak = DB::select('select users.erabiltzailea, IFNULL(users_puntuak.puntuak,0) as puntuak FROM users_taldeak
                INNER JOIN users on users_taldeak.user_id = users.id
                LEFT JOIN users_puntuak on users_taldeak.user_id = users_puntuak.user_id
                WHERE users_taldeak.taldea_id in (SELECT users_taldeak.taldea_id
                FROM users_taldeak 
                WHERE users_taldeak.user_id = ?)', [$userID]);
        /* $taldekide2 = DB::table('partidak')
            ->join('users', 'users.id', '=', 'partidak.id_erabiltzailea')
            ->select('id_erabiltzailea', 'users.id', 'users.erabiltzailea', DB::raw('sum(puntuak) as Totala'))
            ->where('users.erabiltzailea', $request->partaide2)
            ->groupBy('id_erabiltzailea', 'users.id', 'users.erabiltzailea')
            ->orderBy('Puntuak', 'desc')->get();
        $taldekide3 = DB::table('partidak')
            ->join('users', 'users.id', '=', 'partidak.id_erabiltzailea')
            ->select('id_erabiltzailea', 'users.id', 'users.erabiltzailea', DB::raw('sum(puntuak) as Totala'))
            ->where('users.erabiltzailea', $request->partaide3)
            ->groupBy('id_erabiltzailea', 'users.id', 'users.erabiltzailea')
            ->orderBy('Puntuak', 'desc')->get();
        $taldekide4 = DB::table('partidak')
            ->join('users', 'users.id', '=', 'partidak.id_erabiltzailea')
            ->select('id_erabiltzailea', 'users.id', 'users.erabiltzailea', DB::raw('sum(puntuak) as Totala'))
            ->where('users.erabiltzailea', $request->partaide4)
            ->groupBy('id_erabiltzailea', 'users.id', 'users.erabiltzailea')
            ->orderBy('Puntuak', 'desc')->get();
        $taldekide5 = DB::table('partidak')
            ->join('users', 'users.id', '=', 'partidak.id_erabiltzailea')
            ->select('id_erabiltzailea', 'users.id', 'users.erabiltzailea', DB::raw('sum(puntuak) as Totala'))
            ->where('users.erabiltzailea', $request->partaide5)
            ->groupBy('id_erabiltzailea', 'users.id', 'users.erabiltzailea')
            ->orderBy('Puntuak', 'desc')->get();

            $array = array(
                $taldekide2, $taldekide3, $taldekide4, $taldekide5 
            ); */
        return response()->json($array, 200);

    }

}
