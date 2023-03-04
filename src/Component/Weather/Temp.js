import React, { useEffect, useState } from "react";
// api.openweathermap.org/data/2.5/weather?q=bhopal&appid=8332a767f85c909875fa4be8a24d23e8

import "./Temp.css";
import WeatherCard from "./WeatherCard";

const Temp = () => {
  const [searchValue, setSearchValue] = useState("Bhopal");
  const [tempInfo, setTempInfo] = useState({});
  const getWeatherInfo = async () => {
    try {
      let url = `https://api.openweathermap.org/data/2.5/weather?q=${searchValue}&units=metric&appid=8332a767f85c909875fa4be8a24d23e8`;

      const res = await fetch(url);
      const data = await res.json();

      console.log(data);

      const { temp, humidity, pressure } = data.main;

      const { main: weatherMood } = data.weather[0];

      const { name } = data;
      const { speed } = data.wind;
      const { country, sunset } = data.sys;

      const MynewWeatherInfo = {
        temp,
        humidity,
        pressure,
        weatherMood,
        name,
        name,
        speed,
        country,
        sunset,
      };

      setTempInfo(MynewWeatherInfo);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getWeatherInfo();
  }, []);
  return (
    <>
      <div className="wrap">
        <div className="search">
          <input
            type="search"
            placeholder="search..."
            autoFocus
            id="search"
            className="searchTerm"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
          />
          <button
            className="searchButton"
            type="button"
            onClick={getWeatherInfo}
          >
            Search
          </button>
        </div>
      </div>
      <WeatherCard tempInfo={tempInfo} />
    </>
  );
};

export default Temp;
