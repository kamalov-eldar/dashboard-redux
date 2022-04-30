import React from "react";
import { Clock } from "./component/Clock";
import { User } from "./component/User";
import { Weather } from "./component/Weather";
import { ToDo } from "./component/ToDo";
import { useEffect, useState } from "react";

export const App = (props) => {
  //console.log("props-App: ", props);
  const [dataUrl, setDataUrl] = useState("");

  useEffect(() => {
    getRandom();
    setInterval(getRandom, 6000000);
  }, []);

  function getPoster(number) {
    fetch("https://picsum.photos/v2/list?page=1&limit=100")
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
    <div className="wrapper">
      <div className="background" style={{ backgroundImage: `url(${dataUrl})` }}>
        <div className="dashboard container">
          <Weather />
          <Clock />
          <User />
          <ToDo /* store={props.store} */ />
        </div>
      </div>
    </div>
  );
};
