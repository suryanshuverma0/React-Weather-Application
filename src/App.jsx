import "./App.css";
// Update this import statement in 'App.jsx'
import Navbar from "../src/Components/Navbar";
import Temperature from "./Temperature";
import Highlights from "./Components/Highlights";
import { useState } from "react";
function App() {
  const [weatherData, setWeatherData] = useState(null);


  return (
    <div className="bg-[#1F213A] h-screen">
      <div>
        <Navbar />
      </div>
      <div className="flex justify-center pt-28 gap-2">
        <div className="w-1/3 h-96 text-center pt-4">
          <Temperature
            setWeatherData={setWeatherData}
            weatherData={weatherData}
          />
        </div>
        <div className="w-auto h-auto grid grid-cols-2 gap-9 rounded-md shadow-md bg-transparent">
          {weatherData && (
            <>
              <Highlights
                weatherData={weatherData}
                topic="Pressure"
                value={weatherData.main.pressure}
                unit="hPa"
              />

              <Highlights
                weatherData={weatherData}
                topic="Wind Speed"
                value={weatherData.wind.speed}
                unit="m/s"
              ></Highlights>

              {weatherData.main && weatherData.main.sea_level && (
                <Highlights
                  weatherData={weatherData}
                  topic="Sea Level Pressure"
                  value={weatherData.main.sea_level}
                  unit="hPa"
                />
              )}
              {weatherData.main && weatherData.main.grnd_level && (
                <Highlights
                  weatherData={weatherData}
                  topic="Ground Level Pressure"
                  value={weatherData.main.grnd_level}
                  unit="hPa"
                />
              )}

              <Highlights
                weatherData={weatherData}
                topic="Humidity"
                value={weatherData.main.humidity}
                unit="%"
              >
                <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700 mb-3">
                  <div
                    className="bg-blue-600 h-2.5 rounded-full"
                    style={{ width: `${weatherData.main.humidity}%` }}
                  ></div>
                </div>
              </Highlights>

              <Highlights
                weatherData={weatherData}
                topic="Cloudiness"
                value={weatherData.clouds.all}
                unit="%"
              >
                  <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700 mb-3">
                  <div
                    className="bg-blue-600 h-2.5 rounded-full"
                    style={{ width: `${weatherData.clouds.all}%` }}
                  ></div>
                </div>
              </Highlights>

            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
