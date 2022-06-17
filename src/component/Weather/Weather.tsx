import { useState, useEffect } from 'react';
import style from './Style/Weather.module.scss';

const API_KEY = '55d3da6e8cf6878c7e722243e5972a19';

type WeatherData = {
  temp: string;
  city: string;
  iconSrc?: string;
};

export const Weather = () => {
  const [addClass, setAddClass] = useState<Boolean>(false);
  const [dataWeather, setDataWeather] = useState<WeatherData>({
    temp: '',
    city: '',
  });

  useEffect(() => {
    askForCoords();
  }, []);

  function getWeather(position: { coords: { latitude: number; longitude: number } }) {
    const { latitude, longitude } = position.coords;

    fetch(
      `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${API_KEY}&lang={ru}&units=metric`
    )
      .then((response) => response.json())
      .then((responsejson) => {
        const iconSrc = `https://openweathermap.org/img/wn/${responsejson.weather[0]['icon']}@2x.png`;

        setDataWeather({
          temp: responsejson.main.temp,
          city: responsejson.name,
          iconSrc: iconSrc,
        });
      });
  }

  // функция запроса координат
  function askForCoords() {
    navigator.geolocation.getCurrentPosition(getWeather);
  }

  function clickRefresh() {
    setAddClass(!addClass);
      askForCoords();
  }

  function plusTemp() {
    return String(dataWeather.temp).startsWith('-');
  }

  return (
    <div className={style.weather}>
      <div className={style.weather__container}>
        <span className={style.weather__icon}>
          <img src={dataWeather.iconSrc} alt="" />
        </span>
        <span className={style.weather__temp}>
          {plusTemp() ? dataWeather.temp : '+' + dataWeather.temp}°C
        </span>
      </div>
      <div className={style.weather__city_container}>
        <span className={style.weather__refresh} onClick={clickRefresh}>
          <svg
            className={!addClass ? style.refresh__icon : style.refresh__icon_click}
            aria-hidden="true"
            focusable="false"
            data-prefix="fas"
            data-icon="sync"
            role="img"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 512 512"
          >
            <path
              fill="currentColor"
              d="M440.65 12.57l4 82.77A247.16 247.16 0 0 0 255.83 8C134.73 8 33.91 94.92 12.29 209.82A12 12 0 0 0 24.09 224h49.05a12 12 0 0 0 11.67-9.26 175.91 175.91 0 0 1 317-56.94l-101.46-4.86a12 12 0 0 0-12.57 12v47.41a12 12 0 0 0 12 12H500a12 12 0 0 0 12-12V12a12 12 0 0 0-12-12h-47.37a12 12 0 0 0-11.98 12.57zM255.83 432a175.61 175.61 0 0 1-146-77.8l101.8 4.87a12 12 0 0 0 12.57-12v-47.4a12 12 0 0 0-12-12H12a12 12 0 0 0-12 12V500a12 12 0 0 0 12 12h47.35a12 12 0 0 0 12-12.6l-4.15-82.57A247.17 247.17 0 0 0 255.83 504c121.11 0 221.93-86.92 243.55-201.82a12 12 0 0 0-11.8-14.18h-49.05a12 12 0 0 0-11.67 9.26A175.86 175.86 0 0 1 255.83 432z"
            ></path>
          </svg>
        </span>
        <span className={style.weather__city}>{dataWeather.city}</span>
      </div>
    </div>
  );
};
