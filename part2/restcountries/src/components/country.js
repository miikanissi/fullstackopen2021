import {useState, useEffect} from "react";
import axios from "axios";

const api_key = process.env.REACT_APP_API_KEY;

function Country({data: {name, capital, population, flags, languages}}) {
  const [weather, setWeather] = useState({});

  useEffect(() => {
    axios
      .get(
        `https://api.openweathermap.org/data/2.5/weather?q=${capital.toString()}&appid=${api_key}&units=imperial`
      )
      .then((response) => {
        setWeather(response.data);
      });
    return () => setWeather({});
  }, [capital]);

  return (
    <>
      <h1>{name["common"]}</h1>
      <p>capital {capital}</p>
      <p>population {population}</p>
      <h3>Spoken languages</h3>
      <ul>
        {Object.keys(languages).map((key, i) => (
          <li key={i}>{languages[key]}</li>
        ))}
      </ul>
      <img src={flags["png"]} alt={name["common"]} width="100px" />
      {Object.keys(weather).length !== 0 && (
        <>
          <h2>Weather in {capital}</h2>
          <p>
            <strong>temperature:</strong> {weather.main["temp"]} Fahrenheit
          </p>
          <img
            src={`https://openweathermap.org/img/w/${weather.weather[0].icon}.png`}
            alt={weather.weather[0].description}
          />
          <p>
            <strong>wind:</strong> {weather.wind["speed"]} mph direction{" "}
            {weather.wind["deg"]} degrees
          </p>
        </>
      )}
    </>
  );
}

export default Country;
