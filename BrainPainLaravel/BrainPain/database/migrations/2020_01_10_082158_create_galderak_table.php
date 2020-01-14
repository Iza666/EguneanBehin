<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateGalderakTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('galderak', function (Blueprint $table) {
            $table->increments('id');
            $table->string('galdera');
            $table->string('opt1_erantzuna');
            $table->string('opt2');
            $table->string('opt3');
            $table->string('argazkia');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('galderak');
    }
}
