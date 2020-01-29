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


class TaldeaController extends Controller
{
    //talde bat sortu pasatutako datuekin
    public function taldeaSortu(Request $request){
        $taldea = new Taldea();
        $taldea->izena = $request->izena;
        $taldea->partaide1 = auth()->user()->erabiltzailea;
        $taldea->partaide2 = $request->partaide2;
        $taldea->partaide3 = $request->partaide3;
        $taldea->partaide4 = $request->partaide4;
        $taldea->partaide5 = $request->partaide5;
        $taldea->save();

        $denak = Taldea::where('partaide1', auth()->user()->erabiltzailea)->get();

        return response()->json($denak, 200);
    }
    //erabiltzaile baten taldeak lortzeko metodoa
    public function taldeaLortu(){
        $denak = DB::table('taldeak')->where('partaide1', auth()->user()->erabiltzailea)->get();
        return response()->json($denak, 200);

    }
    //talde bateko taldekideak lortzeko metodoa
    public function taldekideakLortu(Request $request){
        $taldea = DB::table('taldeak')->where('izena', $request->taldeIzena)->get();
        return response()->json($taldea, 200);
    }
    //taldekide guztien puntuazioak hartzen ondoren printeatzeko
    public function taldekidePuntuakLortu(Request $request){
        $taldekide2 = DB::table('partidak')
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
            );
        return response()->json($array, 200);

    }

}
