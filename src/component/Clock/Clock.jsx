import { useState, useEffect } from "react";
import style from "./Style/Clock.module.css";

export const Clock = () => {
  const [time, setTime] = useState(""); //

  useEffect(() => {
    setInterval(() => {
      setTime(new Date().toLocaleTimeString());
    }, 1000);
  }, []);
  return (
    <div className={style.clock} /* "clock */>
      <div className={style.clock__header} /* "clock__header" */>
        <h1>{time}</h1>
      </div>
    </div>
  );
};
