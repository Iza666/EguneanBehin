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

class SailkapenaController extends Controller
{
    //logeatuta dagoen erabiltzailearen datuak bidaltzen ditu
    public function GetZureRanking()
    {
        $zurePuntuak = DB::table('partidak')
            ->select(DB::raw('sum(puntuak) as Totala'))->where('id_erabiltzailea', "=", auth()->user()->id)->get();

        return response()->json($zurePuntuak, 200);
    }
    //ranking osoa bueltatzen du
    public function GetRanking()
    {
        $sailkapena = DB::table('partidak')
            ->join('users', 'users.id', '=', 'partidak.id_erabiltzailea')
            ->select('id_erabiltzailea', 'users.id', 'users.erabiltzailea', 'users.argazkia', DB::raw('sum(puntuak) as Totala'))
            ->groupBy('id_erabiltzailea', 'users.id', 'users.erabiltzailea', 'users.argazkia')
            ->orderBy('Totala', 'desc')->get();

        return response()->json($sailkapena, 200);
    }
}