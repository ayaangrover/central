import React from 'react';

const Calendar = () => {
  const today = new Date();
  const day = today.getDate();
  const month = today.toLocaleString('default', { month: 'long' });

  return (
    <div className="glassmorphism p-4 rounded-2xl flex flex-col justify-center items-center">
      <p className="text-8xl font-bold">{day}</p>
      <p className="text-4xl">{month}</p>
    </div>
  );
};

export default Calendar;