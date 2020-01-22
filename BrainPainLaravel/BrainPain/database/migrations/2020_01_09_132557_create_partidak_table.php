<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreatePartidakTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('partidak', function (Blueprint $table) {
            $table->increments('id');
            $table->unsignedinteger('id_erabiltzailea');
            $table->foreign('id_erabiltzailea')->references('id')->on('users')->unsigned()->index();
            $table->date('data')->default(DB::raw('CURRENT_TIMESTAMP'));
            $table->integer('puntuak')->default(0);
            $table->integer('zenbat_zuzen')->default(0);
            $table->string('zenbat_denbora')->default(0);

        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('partidak');
    }
}
