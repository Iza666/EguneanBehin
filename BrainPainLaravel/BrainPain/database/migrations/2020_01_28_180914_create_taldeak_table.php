<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateTaldeakTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('taldeak', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->string('izena');
            $table->string('partaide1');
            $table->string('partaide2');
            $table->string('partaide3');
            $table->string('partaide4');
            $table->string('partaide5');


        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('taldeak');
    }
}
