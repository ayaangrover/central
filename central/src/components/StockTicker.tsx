"use client";

import React, { useEffect, useState } from 'react';
import axios from 'axios';

const StockTicker = () => {
  const stocks = ['PANW', 'AAPL', 'GOOGL']; // Predefined list of stocks
  const [selectedStock, setSelectedStock] = useState<string>('PANW');
  const [price, setPrice] = useState<number | null>(null);

  useEffect(() => {
    const fetchPrice = async () => {
      try {
        const response = await axios.get(
          `https://api.polygon.io/v2/aggs/ticker/${selectedStock}/prev`,
          {
            params: {
              apiKey: 'tmcPLSICXH5pB4qA_QxB4TQI0LDGcLeE',
            },
          }
        );
        setPrice(response.data.results[0].c);
      } catch (error) {
        console.error('Error fetching stock ticker:', error);
      }
    };

    fetchPrice();
  }, [selectedStock]);

  return (
    <div className="glassmorphism p-4 rounded-2xl flex flex-col justify-center items-center relative">
      <div className="absolute top-6 left-6 text-xxl">{selectedStock}</div>
      <p className="text-7xl font-bold">{price ? `$${price}` : 'Loading...'}</p>
    </div>
  );
};

export default StockTicker;