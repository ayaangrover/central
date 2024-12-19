"use client";

import React, { useEffect, useState } from 'react';
import axios from 'axios';

const CurrentClass = () => {
  const [currentClass, setCurrentClass] = useState<string>('School day has ended');
  const [nextClass, setNextClass] = useState<string>('');
  const [nextClassTime, setNextClassTime] = useState<string>('');
  const [nextClassMessage, setNextClassMessage] = useState<string>('');

  useEffect(() => {
    const fetchSchedule = async (date: Date) => {
      const month = date.getMonth() + 1; // getMonth() is zero-based
      const day = date.getDate();
      const year = date.getFullYear();

      try {
        const response = await axios.get('https://msbell-backend.harker.xyz/api/schedule', {
          params: {
            month,
            day,
            year,
          },
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
        });

        return response.data.schedule;
      } catch (error) {
        console.error('Error fetching schedule:', error);
        return null;
      }
    };

    const getNextSchoolDay = async (date: Date) => {
      let nextDate = new Date(date);
      nextDate.setDate(nextDate.getDate() + 1);

      while (true) {
        const schedule = await fetchSchedule(nextDate);
        if (schedule && schedule.length > 0) {
          return { date: nextDate, schedule };
        }
        nextDate.setDate(nextDate.getDate() + 1);
      }
    };

    const updateClassInfo = async () => {
      const today = new Date();
      const dayOfWeek = today.getDay();

      if (dayOfWeek === 0 || dayOfWeek === 6) {
        setCurrentClass("There's no school today");
        const nextSchoolDay = await getNextSchoolDay(today);
        const firstClass = nextSchoolDay.schedule[0];
        setNextClass(`First class on ${nextSchoolDay.date.toDateString()}: ${firstClass.name} at ${new Date(firstClass.start).toLocaleTimeString()}`);
        return;
      }

      const schedule = await fetchSchedule(today);
      if (!schedule || schedule.length === 0) {
        setCurrentClass("There's no school today");
        const nextSchoolDay = await getNextSchoolDay(today);
        const firstClass = nextSchoolDay.schedule[0];
        setNextClass(`First class on ${nextSchoolDay.date.toDateString()}: ${firstClass.name} at ${new Date(firstClass.start).toLocaleTimeString()}`);
        return;
      }

      const now = new Date();
      const nowUTC = new Date(now.toISOString().split('.')[0] + 'Z');

      for (let i = 0; i < schedule.length; i++) {
        const start = new Date(schedule[i].start);
        const end = new Date(schedule[i].end);

        if (nowUTC >= start && nowUTC <= end) {
          setCurrentClass(schedule[i].name);
          if (i + 1 < schedule.length) {
            const nextClassStart = new Date(schedule[i + 1].start);
            setNextClass(schedule[i + 1].name);
            setNextClassTime(nextClassStart.toLocaleTimeString());
            const minutesUntilNextClass = Math.floor((nextClassStart.getTime() - nowUTC.getTime()) / 60000);
            setNextClassMessage(`${schedule[i + 1].name} starts in ${minutesUntilNextClass} minutes`);
          } else {
            const minutesUntilEndOfDay = Math.floor((end.getTime() - nowUTC.getTime()) / 60000);
            setNextClassMessage(`School ends in ${minutesUntilEndOfDay} minutes`);
          }
          return;
        }
      }

      setCurrentClass('School day has ended');
      const nextSchoolDay = await getNextSchoolDay(today);
      const firstClass = nextSchoolDay.schedule[0];
      setNextClass(`First class on ${nextSchoolDay.date.toDateString()}: ${firstClass.name} at ${new Date(firstClass.start).toLocaleTimeString()}`);
    };

    updateClassInfo();
    const interval = setInterval(updateClassInfo, 60000); // Update every minute

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="glassmorphism p-4 rounded-2xl flex flex-col justify-center items-center">
      <p className="text-2xl font-bold text-center">Current Class</p>
      <p className="text-3xl font-bold text-center">{currentClass}</p>
      {nextClass && (
        <>
          <p className="text-2xl font-bold text-center mt-4">Next Class</p>
          <p className="text-4xl font-bold text-center">{nextClass}</p>
          <p className="text-2xl font-bold text-center mt-4">{nextClassMessage}</p>
        </>
      )}
    </div>
  );
};

export default CurrentClass;