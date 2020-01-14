<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateErabiltzaileGalderakTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('erabiltzaile_galderak', function (Blueprint $table) {
            $table->unsignedinteger('id_erabiltzailea');
            $table->foreign('id_erabiltzailea')->references('id')->on('users');
            $table->unsignedinteger('id_galdera');
            $table->foreign('id_galdera')->references('id')->on('galderak');
            $table->unsignedinteger('id_partida');
            $table->foreign('id_partida')->references('id')->on('partidak');
            $table->string('erantzuna');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('erabiltzaile_galderak');
    }
}
