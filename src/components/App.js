import React, { useState, useEffect } from "react";
import axios from "axios";
import SearchEngine from "./SearchEngine";
import Forecast from "./Forecast";

import "../styles.css";
import '@fortawesome/fontawesome-free/css/all.min.css';


function App() {
  const [query, setQuery] = useState("Boston");
  const [weather, setWeather] = useState({
    loading: true,
    data: {},
    error: false
  });

  const toDate = () => {
    const months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "Nocvember",
      "December"
    ];
    const days = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday"
    ];

    const currentDate = new Date();
    const date = `${days[currentDate.getDay()]} ${currentDate.getDate()} ${
      months[currentDate.getMonth()]
    }`;
    return date;
  };

  const search = async (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      setQuery("");
      setWeather({ ...weather, loading: true });
      const apiKey = "afc6fb934f9b782f9f412c235d50607e";
      // const url = `https://api.shecodes.io/weather/v1/current?query=${query}&key=${apiKey}`;
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${query}&appid=${apiKey}&units=metric`;

      await axios
        .get(url)
        .then((res) => {
          console.log("res", res);
          setWeather({ data: res.data, loading: false, error: false });
        })
        .catch((error) => {
          setWeather({ ...weather, data: {}, error: true });
          setQuery("");
          console.log("error", error);
        });
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      const city = "Boston";
      const apiKey = "afc6fb934f9b782f9f412c235d50607e";
      // const url = `https://api.shecodes.io/weather/v1/current?query=Rabat&key=${apiKey}`;
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;


      try {
        const response = await axios.get(url);
        console.log("Response data:", response.data); // レスポンスデータを確認
        
        setWeather({ data: response.data, loading: false, error: false });
        console.log("weather:", weather);
      } catch (error) {
        setWeather({ data: {}, loading: false, error: true });
        console.log("error", error);
      }
    };

    fetchData();
  }, []);

  // return (
  //   <div className="App">

  //     {/* SearchEngine component */}
  //     <SearchEngine query={query} setQuery={setQuery} search={search} />

  //     {weather.loading && (
  //       <>
  //         <br />
  //         <br />
  //         <h4>Searching..</h4>
  //       </>
  //     )}

  //     {weather.error && (
  //       <>
  //         <br />
  //         <br />
  //         <span className="error-message">
  //           <span style={{ fontFamily: "font" }}>
  //             Sorry city not found, please try again.
  //           </span>
  //         </span>
  //       </>
  //     )}

  //     {weather && weather.data && weather.data.condition && (
  //       // Forecast component
  //       <Forecast weather={weather} toDate={toDate} />
  //     )}
  //   </div>
  // );
  return (
    
    <div className="App">
      {/* 検索エンジンコンポーネント */}
      <SearchEngine query={query} setQuery={setQuery} search={search} />
  
      {/* ローディング中の表示 */}
      {weather.loading && (
        <>
          <br />
          <h4>Searching...</h4>
        </>
      )}
      {/* エラーがあった場合の表示 */}
      {weather.error && (
        <>
          <br />
          <span className="error-message">Sorry city not found, please try again.</span>
        </>
      )}
  
      {/* 天気データが存在する場合の表示 */}
      {weather.data && weather.data.wind && (
        <div>
          <h1>Weather in {weather.data.name}</h1>
          {/* const temperature = weather.data.main.temp; */}
          <p>Temperature: {weather.data.main.temp} °C</p>
          <p>Humidity: {weather.data.main.humidity}%</p>
          <p>Wind Speed: {weather.data.wind.speed} km/h</p>
        </div>
      )}
      
      {/* 天気データが存在する場合の表示 */}
      {/* {weather.data && (
        <div>
          <button onClick={() => console.log("Weather data:", weather)}>Console Log Weather Data</button>
        </div>
      )} */}

    </div>
  );
}

export default App;
