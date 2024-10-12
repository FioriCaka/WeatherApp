<?php

use App\Http\Controllers\WeatherController;

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;


Route::get('/', [WeatherController::class, 'index']);


require __DIR__.'/auth.php';
