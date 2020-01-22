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
    Route::get('insertMatch', 'GuztiaController@insertMatch');
    Route::post('insertQuestion', 'GuztiaController@insertQuestion');


  });
Route::get('ranking', 'GuztiaController@getranking');
Route::post('changeProfile', 'GuztiaController@changeProfile');
Route::post('logedPersonMatch', 'GuztiaController@logedPersonMatch');

Route::group([
'middleware' => 'auth:api'], function() {
    Route::get('usertaldea', 'TaldeakController@getUserTaldea' );

});


