"use client";

import React, { useEffect, useState } from 'react';
import axios from 'axios';

const UnsplashWallpaper = () => {
  const [imageUrl, setImageUrl] = useState<string | null>(null);

  useEffect(() => {
    const fetchImage = async () => {
      try {
        const response = await axios.get(
          'https://api.unsplash.com/photos/random',
          {
            params: {
              query: 'nature,landscape',
              orientation: 'landscape',
              client_id: 'k_wsGnTBKq0iHfaBoPo6ysBuJEXdazBQ33YLZAAizyY',
            },
          }
        );
        setImageUrl(response.data.urls.full);
      } catch (error) {
        console.error('Error fetching wallpaper:', error);
      }
    };

    fetchImage(); // Fetch image on initial render

    const interval = setInterval(fetchImage, 600000); // Fetch image every 60 seconds

    return () => clearInterval(interval); // Clear interval on component unmount
  }, []);

  return (
    <div
      className="absolute inset-0 z-0"
      style={{
        backgroundImage: `url(${imageUrl})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        filter: 'brightness(60%)', 
      }}
    />
  );
};

export default UnsplashWallpaper;