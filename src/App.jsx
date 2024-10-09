import { useEffect, useState } from "react";
import "./App.css";
import styles from "./page.module.css";
import SearchIcon from "@mui/icons-material/Search";
import FilterDramaIcon from "@mui/icons-material/FilterDrama";
import DehazeIcon from "@mui/icons-material/Dehaze";
import VapingRoomsIcon from "@mui/icons-material/VapingRooms";
import WbSunnyIcon from "@mui/icons-material/WbSunny";
import AcUnitIcon from "@mui/icons-material/AcUnit";

//let weather_Api_Key = process.env.REACT_APP_WEATHER_API_KEY;

function App() {
  // eslint-disable-next-line no-unused-vars
  const [place, setPlace] = useState("Gokak");
  // eslint-disable-next-line no-unused-vars
  const [placeData, setPlaceData] = useState(null);
  const currentTime = new Date().toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });
  const getWeatherData = async () => {
    if (place && place.length > 0) {
      try {
        let url = `https://api.openweathermap.org/data/2.5/weather?q=${place}&appid=2c860f71be52c700ea3b738d0d98523a`;
        let res = await fetch(url);
        let data = await res.json();
        console.log(data);
        setPlaceData(data);
      } catch (err) {
        console.log(err);
      }
    }
  };

  useEffect(() => {
    getWeatherData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.searchbar}>
        <input
          type="search"
          placeholder="City Name"
          onChange={(e) => setPlace(e.target.value)}
        />
        <button onClick={getWeatherData}>
          <SearchIcon />
        </button>
      </div>
      {placeData && (
        <div className={styles.row}>
          <div className={styles.section1}>
            <div className={styles.section11}>
              {placeData.weather[0].main === "Clouds" && (
                <FilterDramaIcon className={styles.weathericon} />
              )}
              {placeData.weather[0].main === "Haze" && (
                <DehazeIcon className={styles.weathericon} />
              )}
              {placeData.weather[0].main === "Smoke" && (
                <VapingRoomsIcon className={styles.weathericon} />
              )}
              {placeData.weather[0].main === "Sunny" && (
                <WbSunnyIcon className={styles.weathericon} />
              )}
              {placeData.weather[0].main === "Clear" && (
                <AcUnitIcon className={styles.weathericon} />
              )}
              <p className={styles.temp}>
                {(placeData.main.temp - 273.15).toFixed(1)}°C
              </p>
            </div>
            <div className={styles.section11}>
              <p className={styles.city}>{placeData.name}</p>
              <p className={styles.weathertype}>{placeData.weather[0].main}</p>
            </div>
          </div>
          <div className={styles.timediv}>
            <p className={styles.time}>{currentTime}</p>
          </div>
        </div>
      )}

      {placeData && (
        <div className={styles.section2}>
          <div className={styles.section21}>
            <p>Temperature</p>
            <p className={styles.otherdata}>
              {(placeData.main.temp - 273.15).toFixed(1)}°C
            </p>
          </div>

          <div className={styles.section21}>
            <p>Temperature Min</p>
            <p className={styles.otherdata}>
              {(placeData.main.temp_min - 273.15).toFixed(1)}°C
            </p>
          </div>

          <div className={styles.section21}>
            <p>Temperature Max</p>
            <p className={styles.otherdata}>
              {(placeData.main.temp_max - 273.15).toFixed(1)}°C
            </p>
          </div>

          <div className={styles.section21}>
            <p>Humidity</p>
            <p className={styles.otherdata}>{placeData.main.humidity}</p>
          </div>

          <div className={styles.section21}>
            <p>Pressure</p>
            <p className={styles.otherdata}>{placeData.main.pressure}°C</p>
          </div>

          <div className={styles.section21}>
            <p>Visibility</p>
            <p className={styles.otherdata}>{placeData.visibility}°C</p>
          </div>

          <div className={styles.section21}>
            <p>Wind Speed</p>
            <p className={styles.otherdata}>{placeData.wind.speed}km/hr</p>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
