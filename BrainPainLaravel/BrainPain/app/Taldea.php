<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Taldea extends Model
{
    public $timestamps = false;
    protected $table = "taldeak";
    protected $fillable = ['id', 'izena', 'partaide1', 'partaide2', 'partaide3', 'partaide4', 'partaide5'];

}
