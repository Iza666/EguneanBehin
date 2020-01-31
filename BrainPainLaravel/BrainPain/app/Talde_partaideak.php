<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Talde_partaideak extends Model
{
    //
    public $timestamps = false;
    protected $table = "talde_partaideak";
    protected $fillable = ['id', 'id_taldea', 'id_erabiltzailea'];

}
