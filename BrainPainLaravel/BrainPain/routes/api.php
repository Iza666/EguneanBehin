<?php

use Illuminate\Http\Request;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/
Route::group(['middleware' => ['cors']], function () {

    Route::middleware('auth:api')->get('/user', function (Request $request) {
        return $request->user();
    });
    Route::resource('galderak', 'GuztiaController');
});
Route::group([
    'prefix' => 'auth'
], function () {
    Route::post('login', 'Auth\AuthController@login')->name('login');
    Route::post('register', 'Auth\AuthController@register');
    Route::group([
      'middleware' => 'auth:api'
    ], function() {
        Route::get('logout', 'Auth\AuthController@logout');
        Route::get('user', 'Auth\AuthController@user');

    });
});
Route::group([
    'middleware' => 'auth:api'
  ], function() {
      //TODAS LAS RUTAS QUE REQUIEREN LOGIN
    Route::get('insertMatch', 'PartidaController@insertMatch');
    Route::post('insertQuestion', 'PartidaController@insertQuestion');
    Route::get('usertaldea', 'TaldeaController@getUserTaldea' );
    Route::post('endedMatchInsert', 'PartidaController@endedMatchInsert'); 
    Route::post('aldatuProfila', 'ErabiltzaileaController@aldatuProfila');
    Route::get('jokatuta', 'PartidaController@getjokatuta');
    Route::get('partidakLortu', 'PartidaController@partidakLortu');
    Route::post('taldeaSortu', 'TaldeaController@taldeaSortu');
    Route::post('taldeaLortu', 'TaldeaController@sortutakoTaldeaLortu');
    Route::get('zurePuntuak', 'SailkapenaController@GetZureRanking');
    Route::post('taldekideDenaLortu', 'TaldeaController@taldekideDenaLortu');
    Route::post('talderaSartu', 'TaldeaController@talderaSartu');
    Route::post('taldeakLortu', 'TaldeaController@taldeakLortu');
    Route::post('isAdmin', 'TaldeaController@isAdmin');
    Route::post('ezabatuTaldetik', 'TaldeaController@ezabatuTaldetik');

    
  });
  Route::get('ranking', 'SailkapenaController@getranking');




