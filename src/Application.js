import "./Application.css";
import React, { useState, useEffect } from "react";
import Header from "./compo/Header";
import Footer from "./compo/Footer";
import Animloading from "./compo/Animloading";
import swal from "sweetalert";
import { statistic } from "./data/wapi";

function App() {
  // states
  const [load, setLoad] = useState(false);
  const [weatherdata, setWeatherData] = useState({
    coord: {
      lon: -0.1257,
      lat: 51.5085,
    },
    weather: [
      {
        id: 800,
        main: "Clear",
        description: "clear sky",
        icon: "01n",
      },
    ],
    base: "stations",
    main: {
      temp: 283.53,
      feels_like: 282.97,
      temp_min: 282.38,
      temp_max: 284.35,
      pressure: 1000,
      humidity: 90,
    },
    visibility: 10000,
    wind: {
      speed: 2.68,
      deg: 194,
      gust: 4.92,
    },
    clouds: {
      all: 5,
    },
    dt: 1667762630,
    sys: {
      type: 2,
      id: 2075535,
      country: "GB",
      sunrise: 1667718151,
      sunset: 1667751943,
    },
    timezone: 0,
    id: 2643743,
    name: "London",
    cod: 200,
  });
  const [city, setCity] = useState("London");


 
  // get the data from api
  const getData = async () => {
    try {
      const data = await statistic(city);
      setWeatherData(data);
      console.log(data);
    } catch (error) {
      console.log(error.message);
      swal("Warning", "Network Error : No Internet", "warning");
    }
  };
  useEffect(() => {
   getData();
  // eslint-disable-next-line
  }, []);
  //mount
  useEffect(() => {
    setTimeout(() => {
      setLoad(true);
    }, 3500);
  }, []);
  if (!load) return <Animloading />;

  return (
    <>
      <Header />
      <section className="features">
        <section>
          <div className="my-2 my-lg-0 c">
            <input
              value={city}
              onChange={(e) => setCity(e.target.value)}
              className="mr-sm-2"
              type="text"
              name="city"
              id="city"
              placeholder="Enter City..."
            />
            <button
              className="btn btn-outline-success my-2 my-sm-0"
              onClick={(e) => {
                e.preventDefault();
                getData();
              }}
            >
              Search
            </button>
          </div>
        </section>
        <br />

        {weatherdata !== null ? (
          <div className="main-container">
            <h4>Live Weather</h4>
            <div className="weather-icon">
              <img
                src={`http://openweathermap.org/img/w/${weatherdata.weather[0].icon}.png`}
                alt="imgicon"
              />
            </div>
            <h3>{weatherdata.weather[0].main}</h3>
            <div className="temprature">
              <h1>
                {parseFloat(weatherdata.main.temp - 273.15).toFixed(1)}&deg;C
              </h1>
            </div>
            <div className="location">
              <h3>
                <i className="fa fa-street-view"></i>
                {weatherdata.name} | {weatherdata.sys.country}
              </h3>
            </div>
            <div className="temprature-range">
              <h6>
                Min: {parseFloat(weatherdata.main.temp_min - 273.15).toFixed(1)}
                &deg;C || Max:{" "}
                {parseFloat(weatherdata.main.temp_max - 273.15).toFixed(1)}
                &deg;C || Humidity: {weatherdata.main.humidity}%
              </h6>
            </div>
          </div>
        ) : null}
      </section>
      <Footer />
    </>
  );
}

function Application() {
  return <App />;
}

export default Application;
