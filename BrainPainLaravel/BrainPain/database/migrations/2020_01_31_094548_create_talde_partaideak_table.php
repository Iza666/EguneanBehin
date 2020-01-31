<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateTaldePartaideakTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('talde_partaideak', function (Blueprint $table) {
            $table->increments('id');
            $table->integer('id_taldea')->unsigned();
            $table->foreign('id_taldea')->references('id')->on('taldeak');
            $table->integer('id_erabiltzailea')->unsigned();
            $table->foreign('id_erabiltzailea')->references('id')->on('users');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('talde_partaideak');
    }
}
