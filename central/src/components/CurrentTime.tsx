"use client";

import React, { useEffect, useState } from 'react';

const formatTime = (date: Date) => {
  const hours = date.getHours();
  const minutes = date.getMinutes();
  const seconds = date.getSeconds();
  const period = hours >= 12 ? 'postmeridian' : 'antemeridian';

  const formattedHours = hours % 12 || 12;
  const formattedMinutes = minutes.toString().padStart(2, '0');
  const formattedSeconds = seconds.toString().padStart(2, '0');

  return {
    time: `${formattedHours}:${formattedMinutes}:${formattedSeconds}`,
    period,
  };
};

const CurrentTime = () => {
  const [time, setTime] = useState<{ time: string; period: string }>(formatTime(new Date()));

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(formatTime(new Date()));
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="glassmorphism p-4 rounded-2xl flex flex-col justify-center items-center">
      <p className="text-8xl font-bold">
        {time.time}
      </p>
      <span className="text-4xl ml-2">{time.period}</span>
    </div>
  );
};

export default CurrentTime;