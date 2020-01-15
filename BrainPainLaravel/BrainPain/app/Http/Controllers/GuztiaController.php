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
        echo $postdata;
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
