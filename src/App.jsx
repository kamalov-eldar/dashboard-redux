import React from 'react';
import { Clock } from './component/Clock/Clock';
import { User } from './component/User/User';
import { Weather } from './component/Weather/Weather';
import { ToDo } from './component/ToDo/ToDo';
import { useEffect, useState } from 'react';
import style from './style/App.module.css';

export const App = (props) => {
  const [dataUrl, setDataUrl] = useState('');

  useEffect(() => {
    getRandom();
    setInterval(getRandom, 180000);
  }, []);

  function getPoster(number) {
    fetch('https://picsum.photos/v2/list?page=1&limit=100')
      .then((response) => response.json())
      .then((responsejson) => {
        const bacgroundSrc = responsejson[number].download_url;
        setDataUrl(bacgroundSrc);
      });
  }

  function getRandom() {
    const number = Math.floor(Math.random() * 100);
    getPoster(number);
  }

  return (
    <div className={style.wrapper}>
      <div className={style.background} style={{ backgroundImage: `url(${dataUrl})` }}>
        <div className={style.dashboard + ' ' + 'container'}>
          <Weather />
          <div className={style.center__block}>
            <Clock />
            <User />
          </div>
          <ToDo />
        </div>
      </div>
    </div>
  );
};
