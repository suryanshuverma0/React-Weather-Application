import { useState, useEffect } from "react";
import Button from "./Components/Button";
import PropTypes from "prop-types";

function Temperature({ setWeatherData, weatherData }) {
  const apiKey = `a7953af3b1030e24e665e63b023ab7d2`;
  const apiUrl = "https://api.openweathermap.org/data/2.5/weather";

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [city, setCity] = useState("");

  useEffect(() => {
    // Function to get user's current location
    const getUserLocation = () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          async (position) => {
            const { latitude, longitude } = position.coords;
            try {
              setLoading(true);
              const response = await fetch(
                `${apiUrl}?lat=${latitude}&lon=${longitude}&appid=${apiKey}`
              );
              if (!response.ok) {
                throw new Error("Error fetching weather data");
              }
              const data = await response.json();
              setWeatherData(data);
            } catch (error) {
              console.error(error);
              setError(error.message);
            } finally {
              setLoading(false);
            }
          },
          (error) => {
            console.error("Error getting user location:", error);
          }
        );
      } else {
        console.error("Geolocation is not supported by this browser.");
      }
    };

    // Get user's location when the component mounts
    getUserLocation();
  }, [city, setWeatherData , apiKey]); // Empty dependency array to ensure this effect runs only once when component mounts

  async function getWeather() {
    try {
      setLoading(true);

      if (!city.trim()) {
        throw new Error("Please enter a city name");
      }

      const response = await fetch(`${apiUrl}?q=${city}&appid=${apiKey}`);

      if (!response.ok) {
        throw new Error("Enter a valid city name");
      }

      const data = await response.json();
      setWeatherData(data);
    } catch (error) {
      console.error(error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  }

  function convertKelvinToCelsius(kelvin) {
    return (kelvin - 273.15).toFixed(2);
  }

  return (
    <div>
      <div className="flex gap-3 justify-center">
        <>
          <input
            type="text"
            placeholder="Enter the city here"
            className="border border-gray-300 p-2 rounded-md focus:outline-none focus:border-blue-500 w-72"
            onChange={(e) => setCity(e.target.value)}
            value={city}
          />
        </>
        <div>
          <Button text="🔍" onClick={getWeather} color="blue" />
        </div>
      </div>
      {loading && <p className="text-slate-500">Loading...</p>}
      {weatherData ? (
        <div className="flex justify-center items-center text-center flex-col">
          <div className="flex flex-row gap-3 pt-2">
            <p className="text-white text-4xl">{weatherData.name}</p>,
            <p className="text-white text-4xl">{weatherData.sys.country}</p>
          </div>
          <div className="mt-8">
            <img
              src={`http://openweathermap.org/img/w/${weatherData.weather[0].icon}.png`}
              alt="Weather Icon"
              id="weatherIcon"
            />
          </div>
          <div className="mt-4 text-white text-4xl">
            <p>
              {convertKelvinToCelsius(weatherData.main.temp)}{" "}
              <span className="text-3xl ">°C</span>
            </p>
            <p className="text-2xl mt-4">
              Feels like{" "}
              <span className="text-3xl ">
                {convertKelvinToCelsius(weatherData.main.feels_like)}{" "}
              </span>
              <span>°C</span>
            </p>
            <p className="text-3xl m-4">
              Min/Max :{" "}
              <span>{convertKelvinToCelsius(weatherData.main.temp_min)} </span>
              <span>°C</span>/{" "}
              <span>{convertKelvinToCelsius(weatherData.main.temp_max)} </span>
              <span>°C</span>
            </p>
          </div>
          <div className="text-slate-400">
            <p className="text-white-200 text-3xl pt-4">
              {weatherData.weather[0].main}
            </p>
            <p>
              Visibility: <span>{weatherData.visibility}</span> m
            </p>
            <p>
              Wind Direction: {weatherData.wind.deg} <span>°</span>
            </p>
          </div>
        </div>
      ) : null}

      <>
        {error && (
          <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-72 bg-rose-300 p-4 border border-red-500 rounded text-center transition-all duration-300 ease-in-out delay-100">
            <p>{error}</p>
            <button
              className="bg-blue-600 text-white p-1 rounded-md"
              onClick={() => setError(null)}
            >
              Close
            </button>
          </div>
        )}
      </>
    </div>
  );
}

Temperature.propTypes = {
  setWeatherData: PropTypes.func.isRequired,
  weatherData: PropTypes.object.isRequired,
};

export default Temperature;
