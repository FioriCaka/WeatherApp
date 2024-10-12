<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;
use Inertia\Inertia;

class WeatherController extends Controller
{
    public function index(Request $request) {

        $lat = $request->query('lat');
        $lon = $request->query('lon');

        $response = Http::get('http://api.openweathermap.org/data/2.5/weather', [
            'lat' => $lat,
            'lon' => $lon,
            'units' => 'metric',
            'appid' => env('OPEN_WEATHER_KEY'),  // Use the API key from .env
        ]);

        // If the request is successful, return the data to the frontend
        if ($response->successful()) {
            return response()->json($response->json());
        }

        return Inertia::render('WeatherApp', [
            'openWeatherApiKey' => env('OPEN_WEATHER_KEY')
        ]);
    }
}
