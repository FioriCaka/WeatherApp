<?php

use App\Http\Controllers\ProfileController;
use App\Http\Controllers\WeatherController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('WeatherApp',[
        'openWeatherApiKey' => env('OPEN_WEATHER_KEY'),
    ]);
});
Route::get('/weather', [WeatherController::class, 'getWeather']);


require __DIR__.'/auth.php';
