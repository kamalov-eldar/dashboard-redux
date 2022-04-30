import React from "react";
import { useState, useEffect } from "react";

export const Clock = () => {
  const [time, setTime] = useState(""); //

  useEffect(() => {
    setInterval(() => {
      setTime(new Date().toLocaleTimeString());
    }, 1000);
  }, []);
  return (
    <div className="clock container">
      <h1>{time}</h1>
    </div>
  );
};
