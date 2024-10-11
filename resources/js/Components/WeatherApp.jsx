import React, { useState } from 'react';
import axios from 'axios';
import MapComponent from './MapComponent';

const WeatherApp = ({ openWeatherApiKey }) => {
    const [weather, setWeather] = useState(null);
    const [error, setError] = useState('');

    const fetchWeather = (lat, lon) => {
        setError('');

        axios.get(`http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${openWeatherApiKey}`)
            .then(response => {
                setWeather(response.data);
            })
            .catch(error => {
                setError('Failed to fetch weather data. Please try again.');
            });
    };

    const handleLocationSelect = (latlng) => {
        const { lat, lng } = latlng;
        fetchWeather(lat, lng);
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="p-6 max-w-md bg-white rounded-xl shadow-md space-y-4">
                <h1 className="text-xl font-bold text-center">Weather App</h1>
                <MapComponent onLocationSelect={handleLocationSelect} />
                {error && <p className="text-red-500">{error}</p>}

                {weather && (
                    <div>
                        <h2 className="text-xl font-bold">{weather.name}</h2>
                        <p>Temperature: {weather.main.temp}°C</p>
                        <p>Weather: {weather.weather[0].description}</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default WeatherApp;
