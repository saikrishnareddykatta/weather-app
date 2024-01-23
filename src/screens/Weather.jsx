import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { Container, Card, Typography } from "@mui/material";
import { CircularProgress } from "@mui/material";
import LocationForm from "./LocationForm";
import LocationCard from "./LocationCard";
import DetailsCard from "./DetailsCard";
import WeatherCard from "../screens/currentWeather/CurrentWeatherCard";
import AirQualityCard from "./airQuality/AirQuality";
import MarineCard from "./marineWeather/MarineCard";

const Weather = ({ username, userLocation }) => {
  const [displayGeoLocation, setDisplayGeoLocation] = useState(false);
  const [displayWeatherCard, setDisplayWeatherCard] = useState(false);
  const [currentWeather, setCurrentWeather] = useState({});
  const [airQuality, setAirQuality] = useState({});
  const [marineWeather, setMarineWeather] = useState({});
  const [locationDetails, setLocationDetails] = useState({});
  const [isWeatherLoading, setIsWeatherLoading] = useState(true);

  const getWeatherData = useCallback(
    async (cityName, countryName) => {
      setIsWeatherLoading(true);
      try {
        const payload = {
          cityName,
          countryName,
        };
        const currentResponse = await axios.post(
          `/api/v1/weather/currentWeather`,
          payload
        );
        const airQualityResponse = await axios.post(
          `/api/v1/weather/airQuality`,
          payload
        );
        const marineWeatherResponse = await fetch(
          "/api/v1/weather/marineWeather",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(payload),
          }
        );
        const marineData = await marineWeatherResponse.json();
        const currentStatus = currentResponse.status;
        const airQualityStatus = airQualityResponse.status;
        if (marineWeatherResponse.ok) {
          setMarineWeather({
            errorMessage: "",
            data: marineData,
          });
        } else {
          setMarineWeather({
            errorMessage: marineData.errorMessage,
            data: "",
          });
        }
        if (currentStatus === 200) {
          const {
            locationComponents,
            formattedLocation,
            latitude,
            longitude,
            timestamps,
          } = currentResponse.data;
          setCurrentWeather({
            errorMessage: "",
            data: currentResponse.data,
          });
          setLocationDetails({
            data: {
              locationComponents,
              formattedLocation,
              latitude,
              longitude,
              timestamps,
            },
            errorMessage: "",
          });
        } else {
          setCurrentWeather({
            errorMessage: "Unable to find Current Weather for this location",
            data: {
              timestamps: "",
              timezone: "",
              currentWeather: [
                {
                  currentWeatherInfo: {
                    temperature: "",
                    feelsLike: "",
                    minTemperature: "",
                    maxTemperature: "",
                    pressure: "",
                    humidity: "",
                  },
                },
              ],
            },
          });
          setLocationDetails({
            data: "",
            errorMessage: "Unable to find Location Details",
          });
        }
        if (airQualityStatus === 200) {
          setAirQuality({
            data: airQualityResponse.data,
            errorMessage: "",
          });
        } else {
          setAirQuality({
            data: "",
            errorMessage: "Unable to find Air Quality for this location",
          });
        }
        setDisplayGeoLocation(true);
        setDisplayWeatherCard(true);
        setIsWeatherLoading(false);
      } catch (error) {
        setDisplayWeatherCard(false);
        setIsWeatherLoading(false);
        console.error("***Error fetching weather data:", error.message);
      }
    },
    [setAirQuality, setCurrentWeather, setLocationDetails, setMarineWeather]
  );

  useEffect(() => {
    if (Object.keys(userLocation)?.length > 0) {
      const { cityName, country } = userLocation.geographics;
      getWeatherData(cityName, country);
      setDisplayGeoLocation(true);
    }
  }, [userLocation, getWeatherData]);

  return (
    <div>
      <Container>
        <Typography
          variant="h6"
          component="div"
          style={{
            textAlign: "center",
            fontWeight: "bold",
          }}
        >
          Hello {username}
        </Typography>
      </Container>
      <div>
        <Container
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            marginTop: "15px",
          }}
        >
          {displayGeoLocation && (
            <LocationForm getWeatherData={getWeatherData} />
          )}
          {!displayGeoLocation && (
            <Card elevation={3} style={{ borderRadius: "15px", flex: "1" }}>
              <LocationCard getWeatherData={getWeatherData} />
            </Card>
          )}
        </Container>
        {isWeatherLoading && (
          <Container
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              marginTop: "15px",
            }}
          >
            {isWeatherLoading && (
              <CircularProgress size={48} color="secondary" />
            )}
          </Container>
        )}
        {!isWeatherLoading && (
          <div>
            <Container
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                marginTop: "15px",
              }}
            >
              {displayWeatherCard && (
                <Card elevation={3} style={{ borderRadius: "15px", flex: "1" }}>
                  <DetailsCard locationDetails={locationDetails} />
                </Card>
              )}
            </Container>
            <Container
              style={{ display: "flex", gap: "15px", marginTop: "15px" }}
            >
              {displayWeatherCard && (
                <Card
                  elevation={3}
                  style={{ borderRadius: "15px", flex: "1", width: "100%" }}
                >
                  <WeatherCard weatherData={currentWeather} />
                </Card>
              )}
              {displayWeatherCard && (
                <Card
                  elevation={3}
                  style={{ borderRadius: "15px", flex: "1", width: "100%" }}
                >
                  <AirQualityCard airQuality={airQuality} />
                </Card>
              )}
              {displayWeatherCard && (
                <Card
                  elevation={3}
                  style={{ borderRadius: "15px", flex: "1", width: "100%" }}
                >
                  <MarineCard marineWeather={marineWeather} />
                </Card>
              )}
            </Container>
          </div>
        )}
      </div>
    </div>
  );
};

export default Weather;
