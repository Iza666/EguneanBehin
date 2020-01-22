<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Erabiltzaile_Galdera extends Model
{
    protected $table = 'erabiltzaile_galderak';
    public $timestamps = false;
    protected $fillable = ['id_erabiltzailea', 'id_galdera', 'id_partida', 'erantzuna'];
}
