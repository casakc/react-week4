import  { useState } from "react";
import axios from "axios";
import "./App.css";
import ReactAnimatedWeather from "react-animated-weather";

export default function App(props) {
  let [city, setCity] = useState("");
  let [temperature, setTemperature] = useState(null);
  let [description, setDescription] = useState("");
  let [humidity, setHumidity] = useState(null);
  let [wind, setWind] = useState(null);
  let [icon, setIcon] = useState(null);

  function updateCity(event) {
    setCity(event.target.value);
  }

  function getWeather(event) {
    event.preventDefault();
    if (city.length > 0) {
      let APIkey = "9e0fb79c2f66d0cd0dcf06710976a873";
      let APIUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${APIkey}&units=metric`;
      axios.get(APIUrl).then((response) => {
        setTemperature(response.data.main.temp);
        setDescription(response.data.weather[0].description);
        setHumidity(response.data.main.humidity);
        setWind(response.data.wind.speed);
        setIcon(mapIcon(response.data.weather[0].main));
      });
    } else {
      alert("Please type a location");
    }
  }

  function mapIcon(weather) {
    const iconMapping = {
      Clear: "CLEAR_DAY",
      Clouds: "CLOUDY",
      Rain: "RAIN",
      Snow: "SNOW",
      Drizzle: "SLEET",
      Thunderstorm: "WIND",
      Mist: "FOG",
      Smoke: "FOG",
      Haze: "FOG",
      Dust: "FOG",
      Fog: "FOG",
      Sand: "FOG",
      Ash: "FOG",
      Squall: "WIND",
      Tornado: "WIND",
    };
    return iconMapping[weather] || "";
  }

  return (
    <div className="App">
      <h1>Weather App</h1>
      <form onSubmit={getWeather}>
        <input
          type="search"
          placeholder="Enter a city..."
          autoFocus={true}
          onChange={updateCity}
        />
        <input type="submit" value="Search" />
      </form>

      {city.length > 0 && (
        <div className="center">
          <ul>
            <li>Temperature: {Math.round(temperature)}°C</li>
            <li>Description: {description}</li>
            <li>Humidity: {humidity}%</li>
            <li>Wind Speed: {Math.round(wind)} m/s</li>
          </ul>

          <div>
            <ReactAnimatedWeather
              icon={icon}
              color="black"
              size={48}
              animate={true}
            />
          </div>
        </div>
      )}
    <p><a href="https://github.com/casakc/react-week4">Open-source code</a>, coded by Catarina S-A</p>
    </div>
  );
}