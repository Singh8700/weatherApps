import React, { useState, useEffect } from 'react';
import axios from 'axios';

const API_KEY = '46f80a02ecae410460d59960ded6e1c6'; // Replace with your OpenWeatherMap API key

const App = () => {
  const [weatherData, setWeatherData] = useState('')
  const [location, setLocation] = useState('') // Store the location entered by the user

  useEffect(() => {
    // Fetch weather data when the component mounts and whenever the location changes
    if(location.trim().length == 0){
      setWeatherData('')
     // alert("work ")
    }
    if(location){
      fetchWeatherData();
    }
  }, [location]);

  const fetchWeatherData = async () => {
    try {
      const response = await
      axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${API_KEY}&units=metric`)
      const res = await response.data
      //console.log("weather adat",res)
      setWeatherData(res);
    } catch (error) {
      console.error('Error fetching weather data:', error);
      //alert('Error fetching weather data:', error)
    }
  }

  const weatherHandler = (e) => {
    //e.preventDefault()
    setLocation(e.target.value)
    fetchWeatherData()
  };

  return (
    <div className="container">
      <h1>Weather App</h1>
      <form className="container">
        <input
          type="text"
          value={location}
          placeholder="Enter location"
          onChange={weatherHandler}
        />
      </form>
      {weatherData && (
        <div>
          <h2>{weatherData.name}</h2>
          <p>Temperature: {weatherData.main.temp}°C</p>
          <p>Humidity: {weatherData.main.humidity}%</p>
          <p>Wind Speed: {weatherData.wind.speed} m/s</p>
          <p>Description: {weatherData.weather[0].description}</p>
        </div>
      )}
    </div>
  );
};

export default App;
