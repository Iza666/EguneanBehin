<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateSailkapenaTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('sailkapena', function (Blueprint $table) {
            $table->increments('id_erabiltzailea');
            $table->foreign('id_erabiltzailea')->references('id')->on('users');
            $table->integer('puntuak');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('sailkapena');
    }
}
