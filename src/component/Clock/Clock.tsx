import React, { useState, useEffect } from 'react';
import style from './Style/Clock.module.scss';

export const Clock: React.FC = () => {
  const [time, setTime] = useState(''); //

  useEffect(() => {
    setInterval(() => {
      setTime(new Date().toLocaleTimeString());
    }, 1000);
  }, []);
  return (
    <div className={style.clock}>
      <div className={style.clock__header}>
        <h1>{time}</h1>
      </div>
    </div>
  );
};

