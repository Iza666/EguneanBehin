<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Taldea extends Model
{
    public $timestamps = false;
    protected $table = "taldeak";
    protected $fillable = ['id', 'izena', 'token'];

}
