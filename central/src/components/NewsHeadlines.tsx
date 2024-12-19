"use client";

import React, { useEffect, useState } from 'react';
import axios from 'axios';

const NewsHeadlines = () => {
  const [headlines, setHeadlines] = useState<string[]>([]);

  useEffect(() => {
    const fetchHeadlines = async () => {
      try {
        const response = await axios.get(
          'https://newsapi.org/v2/top-headlines?apiKey=b2f8516bddfc4d18bd602d4a080ec227',
          {
            params: {
              country: 'us',
              apiKey: 'b2f8516bddfc4d18bd602d4a080ec227',
              category: 'general',
            },
          }
        );
        setHeadlines(response.data.articles.map((article: any) => article.title));
      } catch (error) {
        console.error('Error fetching news headlines:', error);
      }
    };

    fetchHeadlines();
  }, []);

  return (
    <div className="glassmorphism p-4 rounded-2xl flex flex-col justify-center items-center">
      <div className="absolute top-6 left-6 text-xxl">Top Headlines</div>
      <ul className="absolute top-30 left-6 right-6 text-3xl font-bold">
        {headlines.slice(0, 1).map((headline, index) => (
          <li key={index} className="mb-2">{headline}</li>
        ))}
      </ul>
    </div>
  );
};

export default NewsHeadlines;