import React from "react";
import { useState, useEffect } from "react";

export function Timer() {
  const start_date = new Date("11-23-2021 9:00 AM CST");

  const calculate_time = () => {
    const now = new Date();
    const difference = start_date - now;

    let timeLeft = {
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 0,
    };
    if (difference > 0) {
      timeLeft = {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
    }
    return timeLeft;
  };

  const [timeLeft, setTimeLeft] = useState(calculate_time());

  useEffect(() => {
    const timer = setTimeout(() => {
      setTimeLeft(calculate_time());
    }, 1000);
    return () => clearTimeout(timer);
  });

  const timerComponents = [];
  Object.keys(timeLeft).forEach((interval) => {
    if (interval === "hours") {
      timerComponents.push(
        <span>
          {timeLeft[interval]}
          {":"}
        </span>
      );
    }
    if (interval === "minutes") {
      timerComponents.push(
        <span>
          {timeLeft[interval].toString().padStart(2, "0")}
          {":"}
        </span>
      );
    }
    if (interval === "seconds") {
      timerComponents.push(
        <span>{timeLeft[interval].toString().padStart(2, "00")}</span>
      );
    }
  });
  console.log(timeLeft)

  return (
    
    !(
      timeLeft.days === 0 &&
      timeLeft.hours === 0 &&
      timeLeft.minutes === 0 &&
      timeLeft.seconds === 0
    ) ? (
     
      <div className="flex-row space-between-sm">
           <div className="w-3 h-3 flex-col flex-center bg-gray rounded-md">
          <span className="font-lg white weight-600">
            {timeLeft.days.toString().length > 1
              ? timeLeft.days
              : "0" + timeLeft.days}
          </span>
          <span className="font-sm gray">Days</span>
        </div>
        <div className="w-3 h-3 flex-col flex-center bg-gray rounded-md">
          <span className="font-lg white weight-600">
            {timeLeft.hours.toString().length > 1
              ? timeLeft.hours
              : "0" + timeLeft.hours}
          </span>
          <span className="font-sm gray">Hours</span>
        </div>
        <div className="w-3 h-3 flex-col flex-center bg-gray rounded-md">
          <span className="font-lg white weight-600">
            {timeLeft.minutes.toString().length > 1
              ? timeLeft.minutes
              : "0" + timeLeft.minutes}
          </span>
          <span className="font-sm gray">Mins</span>
        </div>
        <div className="w-3 h-3 flex-col flex-center bg-gray rounded-md">
          <span className="font-lg white weight-600">
            {timeLeft.seconds.toString().length > 1
              ? timeLeft.seconds
              : "0" + timeLeft.seconds}
          </span>
          <span className="font-sm gray">Sec</span>
        </div>
      </div>
    ) : <div></div>
  );
}

export default Timer;
