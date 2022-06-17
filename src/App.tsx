import React from 'react';
import { User } from './component/User/User';
import { Weather } from './component/Weather/Weather';
import { ToDo } from './component/ToDo/ToDo';
import { Clock } from './component/Clock/Clock';
import { useEffect, useState } from 'react';
import style from './style/App.module.scss';
import { getPoster } from './api/api';

export const App: React.FC = () => {

  return (
    <div className={style.wrapper}>
      <BackgroundImage />
      <div className={style.dashboard + ' ' + 'container'}>
        <Weather />
        <div className={style.center__block}>
          <Clock />
          <User />
        </div>
        <ToDo />
      </div>
    </div>
  );
};

const BackgroundImage: React.FC = () => {
  const [dataUrl, setDataUrl] = useState<string>('');
  function setRandomBackground() {
    const number: number = Math.floor(Math.random() * 100);
    getPoster(number).then((src: string) => {
      setDataUrl(src);
    });
  }
  useEffect(() => {
    setRandomBackground();
    setInterval(setRandomBackground, 180000);
  }, []);

  return <div className={style.background} style={{ backgroundImage: `url(${dataUrl})` }}></div>;
};
