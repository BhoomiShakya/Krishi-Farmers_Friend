import React, { useState, useEffect } from 'react';

const WeatherComponent = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchWeatherData = async () => {
      try {
        const response = await fetch('https://api.tomorrow.io/v4/weather/forecast?location=new%20york&timesteps=daily&apikey=sFAPslJjl9Ky7xqHONn22qHRNQC9wrul');
        const data = await response.json();
        setWeatherData(data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching weather data:', error);
        setLoading(false);
      }
    };

    fetchWeatherData();
  }, []);

  const formatDateString = (dateString) => {
    try {
      // Split the string at 'T' to separate date and time
      const parts = dateString.split('T');
      const datePart = parts[0];
      const timePart = parts[1].slice(0, -1); // Remove the 'Z' at the end
      return { date: datePart, time: timePart };
    } catch (error) {
      console.error('Error formatting date:', error);
      return { date: 'Invalid Date', time: 'Invalid Time' };
    }
  };

  return (
    <div style={{ fontFamily: 'Arial, sans-serif', maxWidth: '800px', margin: 'auto', padding: '20px', background: '#f7f7f7', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
      <h2 style={{ textAlign: 'center', marginBottom: '20px', color: '#333' }}>Weather Forecast</h2>
      {loading ? (
        <p>Loading...</p>
      ) : weatherData ? (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          {weatherData.timelines.daily.map(day => (
            <div key={day.startTime} style={{ background: '#fff', padding: '20px', borderRadius: '8px', marginBottom: '20px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)', width: '100%' }}>
              <p style={{ fontSize: '18px', marginBottom: '5px' }}>Date: {formatDateString(day.time).date}</p>
              <p style={{ fontSize: '14px', marginBottom: '10px', color: '#666' }}>Time: {formatDateString(day.time).time}</p>
              <p style={{ marginBottom: '5px' }}>Temperature: {day.values.temperatureAvg}°C</p>
              <p style={{ marginBottom: '5px' }}>Precipitation Probability: {day.values.precipitationProbabilityAvg}%</p>
              <p style={{ marginBottom: '5px' }}>Humidity: {day.values.humidityAvg}%</p>
            </div>
          ))}
        </div>
      ) : (
        <p>No weather data available</p>
      )}
    </div>
  );
};

export default WeatherComponent;
