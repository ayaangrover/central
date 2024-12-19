"use client";

import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Weather = () => {
  const city = 'Saratoga, CA';
  const [temperature, setTemperature] = useState<number | null>(null);

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const response = await axios.get(
          'https://api.openweathermap.org/data/2.5/weather',
          {
            params: {
              q: 'Saratoga,CA,US',
              appid: '3df404f02f990e18c84f0ecff75b6963',
              units: 'imperial', // Use Fahrenheit
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