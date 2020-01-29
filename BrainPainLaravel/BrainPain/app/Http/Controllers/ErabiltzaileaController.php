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

class ErabiltzaileaController extends Controller
{
    //profileko datuak aldatzen ditu
    public function aldatuProfila(Request $request)
    {
        DB::table('users')
            ->where('id', auth()->user()->id)
            ->update(['erabiltzailea'=>$request->erabiltzailea]);  
        DB::table('users')
            ->where('id', auth()->user()->id)
            ->update(['email'=>$request->email]);
            return response()->json("aldatuta", 200);
    }
}
