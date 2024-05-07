import React, { useState, useEffect } from 'react';

const WeatherComponent = () => {
  const [weatherData, setWeatherData] = useState([
    {
      startTime: "2024-04-13T10:00:00Z",
      values: {
        temperatureAvg: 25,
        precipitationProbabilityAvg: 20,
        humidityAvg: 60
      },
      sunriseTime: "2024-04-13T06:30:00Z",
      sunsetTime: "2024-04-13T18:45:00Z"
    },
    {
      startTime: "2024-04-14T10:00:00Z",
      values: {
        temperatureAvg: 27,
        precipitationProbabilityAvg: 10,
        humidityAvg: 55
      },
      sunriseTime: "2024-04-14T06:28:00Z",
      sunsetTime: "2024-04-14T18:47:00Z"
    },
    {
      startTime: "2024-04-15T10:00:00Z",
      values: {
        temperatureAvg: 26,
        precipitationProbabilityAvg: 30,
        humidityAvg: 65
      },
      sunriseTime: "2024-04-15T06:25:00Z",
      sunsetTime: "2024-04-15T18:49:00Z"
    },
    {
      startTime: "2024-04-16T10:00:00Z",
      values: {
        temperatureAvg: 24,
        precipitationProbabilityAvg: 40,
        humidityAvg: 70
      },
      sunriseTime: "2024-04-16T06:22:00Z",
      sunsetTime: "2024-04-16T18:51:00Z"
    },
    {
      startTime: "2024-04-17T10:00:00Z",
      values: {
        temperatureAvg: 23,
        precipitationProbabilityAvg: 50,
        humidityAvg: 75
      },
      sunriseTime: "2024-04-17T06:20:00Z",
      sunsetTime: "2024-04-17T18:53:00Z"
    }
  ]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(false);
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
    <div style={{ fontFamily: 'Arial, sans-serif', maxWidth: '800px', margin: 'auto' }}>
      <h2 style={{ textAlign: 'center', marginBottom: '20px', color: '#333' }}>Weather Forecast</h2>
      {loading ? (
        <p>Loading...</p>
      ) : weatherData ? (
        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between' }}>
          {weatherData.slice(0, 3).map((day, index) => (
            <div key={index} style={{ background: '#fff', padding: '20px', borderRadius: '8px', marginBottom: '20px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)', width: 'calc(33% - 20px)' }}>
              <p style={{ fontSize: '18px', marginBottom: '5px' }}>Date: {formatDateString(day.startTime).date}</p>
              <p style={{ fontSize: '14px', marginBottom: '10px', color: '#666' }}>Time: {formatDateString(day.startTime).time}</p>
              <p style={{ marginBottom: '5px' }}>Temperature: {day.values.temperatureAvg}°C</p>
              <p style={{ marginBottom: '5px' }}>Precipitation Probability: {day.values.precipitationProbabilityAvg}%</p>
              <p style={{ marginBottom: '5px' }}>Humidity: {day.values.humidityAvg}%</p>
              <p style={{ marginBottom: '5px' }}>Sunrise: {formatDateString(day.sunriseTime).time}</p>
              <p style={{ marginBottom: '5px' }}>Sunset: {formatDateString(day.sunsetTime).time}</p>
            </div>
          ))}
          <div style={{ width: '100%', display: 'flex', justifyContent: 'space-between' }}>
            {weatherData.slice(3, 5).map((day, index) => (
              <div key={index} style={{ background: '#fff', padding: '20px', borderRadius: '8px', marginBottom: '20px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)', width: 'calc(50% - 20px)' }}>
                <p style={{ fontSize: '18px', marginBottom: '5px' }}>Date: {formatDateString(day.startTime).date}</p>
                <p style={{ fontSize: '14px', marginBottom: '10px', color: '#666' }}>Time: {formatDateString(day.startTime).time}</p>
                <p style={{ marginBottom: '5px' }}>Temperature: {day.values.temperatureAvg}°C</p>
                <p style={{ marginBottom: '5px' }}>Precipitation Probability: {day.values.precipitationProbabilityAvg}%</p>
                <p style={{ marginBottom: '5px' }}>Humidity: {day.values.humidityAvg}%</p>
                <p style={{ marginBottom: '5px' }}>Sunrise: {formatDateString(day.sunriseTime).time}</p>
                <p style={{ marginBottom: '5px' }}>Sunset: {formatDateString(day.sunsetTime).time}</p>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <p>No weather data available</p>
      )}
    </div>
  );
};

export default WeatherComponent;
