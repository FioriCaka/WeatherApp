import React, { useState } from 'react';
import axios from 'axios';
import MapComponent from './MapComponent';

const WeatherApp = ({ openWeatherApiKey }) => {
    const [weather, setWeather] = useState(null);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState()



    const fetchWeather = async (lat, lon) => {
        try{

            setLoading(true)
            setError('');

            const response = await axios.get('/', {
            params: { lat, lon },
            });
            if (response.status === 200) {
                setWeather(response.data);
            } else {
                setError('Unexpected response from the server');
            }
            }catch (err) {
        setError('Failed to fetch weather data. Please try again.');
        } finally {
        setLoading(false);
        }
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
                    {loading && <p>Loading weather data...</p>}


                    {weather && (
                        <div>
                            <h2 className="text-xl font-bold">{weather.name}</h2>
                            <p>Temperature: {weather.main.temp}°C</p>
                            <p>Weather: {weather.weather[0].description}</p>
                        </div>
                    )}

                    {error && <p className="text-red-500">{error}</p>}
            </div>
        </div>
    );
};

export default WeatherApp;
