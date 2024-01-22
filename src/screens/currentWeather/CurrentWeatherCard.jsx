import React from "react";
import { CardContent, Typography } from "@mui/material";
import {
  convertTimestamp,
  capitalizeWeatherCondition,
  pressureInHg,
  commonTypographyStyle,
  assessWeatherConditions,
} from "../../utils/helper";

const WeatherCard = ({ weatherData }) => {
  const { errorMessage, data } = weatherData;
  console.log("***WeatherData", weatherData);
  const {
    timestamps,
    timezone,
    currentWeather: {
      [Object.keys(weatherData?.data?.currentWeather)[0]]: {
        currentWeatherInfo,
        weatherConditions,
        windConditions,
        visibility,
        cloudinessPercentage,
        snowConditions,
        rainConditions,
      },
    },
  } = weatherData?.data;

  const hasSnowData =
    snowConditions?.lastOneHour > 0 || snowConditions?.lastThreeHour > 0;

  const hasRainData =
    rainConditions?.lastOneHour > 0 || rainConditions?.lastThreeHour > 0;

  const weatherInfo = {
    temperature: currentWeatherInfo?.temperature,
    feelsLike: currentWeatherInfo?.feelsLike,
    humidity: currentWeatherInfo?.humidity,
    windSpeed: windConditions?.speed,
    pressure: pressureInHg(currentWeatherInfo?.pressure),
    visibility: visibility,
    cloudiness: cloudinessPercentage,
    snowLastHour: snowConditions?.lastOneHour,
    snowLast3Hours: snowConditions?.lastThreeHour,
    rainLastHour: rainConditions?.lastOneHour,
    rainLast3Hours: rainConditions?.lastThreeHour,
  };

  return (
    <CardContent>
      <Typography variant="h5" component="div" style={{ textAlign: "center" }}>
        Current Weather
      </Typography>
      {errorMessage && !data ? (
        <Typography
          color="text.secondary"
          style={{
            textAlign: "center",
            fontWeight: "bold",
            fontSize: "14px",
          }}
        >
          No Current Weather Data available for this Location
        </Typography>
      ) : (
        <div>
          <Typography
            color="text.secondary"
            style={{
              textAlign: "center",
              fontWeight: "bold",
              fontSize: "14px",
            }}
          >
            {assessWeatherConditions(weatherInfo)}
          </Typography>
          <Typography {...commonTypographyStyle}>
            <span style={{ fontWeight: "bold" }}>Temperature:</span>{" "}
            {currentWeatherInfo?.temperature}°C
          </Typography>
          <Typography {...commonTypographyStyle}>
            <span style={{ fontWeight: "bold" }}>Feels Like:</span>{" "}
            {currentWeatherInfo?.feelsLike}°C
          </Typography>
          <Typography {...commonTypographyStyle}>
            <span style={{ fontWeight: "bold" }}>Humidity: </span>{" "}
            {currentWeatherInfo?.humidity}%
          </Typography>
          <Typography {...commonTypographyStyle}>
            <span style={{ fontWeight: "bold" }}>Condition:</span>{" "}
            {capitalizeWeatherCondition(weatherConditions?.description)}
          </Typography>
          <Typography {...commonTypographyStyle}>
            <span style={{ fontWeight: "bold" }}>Wind Speed:</span>{" "}
            {windConditions?.speed} m/s, {windConditions?.degree}°
          </Typography>
          <Typography {...commonTypographyStyle}>
            <span style={{ fontWeight: "bold" }}>Pressure:</span>{" "}
            {pressureInHg(currentWeatherInfo?.pressure)} inHg
          </Typography>
          <Typography {...commonTypographyStyle}>
            <span style={{ fontWeight: "bold" }}>Visibility:</span> {visibility}{" "}
            meters
          </Typography>
          <Typography {...commonTypographyStyle}>
            <span style={{ fontWeight: "bold" }}>Cloudiness:</span>{" "}
            {cloudinessPercentage}%
          </Typography>
          {hasSnowData && (
            <Typography {...commonTypographyStyle}>
              <span style={{ fontWeight: "bold" }}>Snow:</span>{" "}
              {snowConditions?.lastOneHour} mm in last hour,{" "}
              {snowConditions?.lastThreeHour} mm in the last 3 hours
            </Typography>
          )}
          {hasRainData && (
            <Typography {...commonTypographyStyle}>
              <span style={{ fontWeight: "bold" }}>Rain:</span>{" "}
              {rainConditions?.lastOneHour} mm in last hour,{" "}
              {rainConditions?.lastThreeHour} mm in the last 3 hours
            </Typography>
          )}
          <Typography {...commonTypographyStyle}>
            <span style={{ fontWeight: "bold" }}>Sunrise:</span>{" "}
            {convertTimestamp(timestamps?.sunrise, timezone?.shortName)}
          </Typography>
          <Typography {...commonTypographyStyle}>
            <span style={{ fontWeight: "bold" }}>Sunset:</span>{" "}
            {convertTimestamp(timestamps?.sunset, timezone?.shortName)}
          </Typography>
        </div>
      )}
    </CardContent>
  );
};

export default WeatherCard;
