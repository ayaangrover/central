"use client";

import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Weather = () => {
  const city = 'Sacramento, CA ,US'
  const [temperature, setTemperature] = useState<number | null>(null);

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const response = await axios.get(
          'https://api.openweathermap.org/data/2.5/weather',
          {
            params: {
              q: 'Sacramento,CA,US',
              appid: process.env.NEXT_PUBLIC_WEATHER_API_KEY,
              units: 'imperial',
            },
          }
        );
        setTemperature(response.data.main.temp);
      } catch (error) {
        console.error('Error fetching weather:', error);
      }
    };

    fetchWeather();
  }, []);

  return (
    <div className="glassmorphism p-4 rounded-2xl flex flex-col justify-center items-center relative">
      <div className="absolute top-6 left-6 text-xxl">{city}</div>
      {temperature !== null ? (
        <p className="text-7xl font-bold">{temperature.toFixed(1)}°F</p>
      ) : (
        <p className="text-7xl font-bold">Loading...</p>
      )}
    </div>
  );
};

export default Weather;