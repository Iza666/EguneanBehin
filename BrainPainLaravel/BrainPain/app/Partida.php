<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Partida extends Model
{
    //
    public $timestamps = false;
    protected $table = "partidak";
    protected $fillable = ['id', 'id_erabiltzailea', 'data', 'puntuak', 'zenbat_zuzen', 'zenbat_denbora'];

}
