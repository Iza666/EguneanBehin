<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Galdera extends Model
{
    protected $table = 'galderak';
    protected $primaryKey = 'id';
    protected $fillable = ['galdera', 'opt1', 'opt2', 'opt3', 'erantzuna', 'argazkia'];
}
