import React, { useState } from "react";
import axios from "axios";
import {
  Container,
  Card,
  CardContent,
  TextField,
  Button,
  Typography,
  ButtonGroup,
} from "@mui/material";

const Weather = () => {
  const [city, setCity] = useState("");
  const [country, setCountry] = useState("");
  const [temperature, setTemperature] = useState("");
  const [windSpeed, setWindSpeed] = useState("");
  const [unit, setUnit] = useState("Celsius");

  const handleCityChange = (e) => {
    setCity(e.target.value);
  };

  const handleCountryChange = (e) => {
    setCountry(e.target.value);
  };

  const handleSubmit = async () => {
    try {
      const response = await axios.get(`http://localhost:8000/city`, {
        params: {
          cityName: city,
          countryName: country,
        },
      });
      console.log("***response", response.data);
      // Add logic to update state based on the response data
    } catch (error) {
      console.error("***Error fetching weather data:", error.message);
      // Add logic to handle the error (e.g., display an error message)
    }
  };

  const handleUnitChange = (newUnit) => {
    setUnit(newUnit);
  };

  return (
    <Container
      maxWidth="md"
      style={{ marginTop: "50px", display: "flex", gap: "20px" }}
    >
      <Card elevation={3} style={{ borderRadius: "15px", flex: "1" }}>
        <CardContent>
          <Typography variant="h6">Enter Location: </Typography>
          <TextField
            fullWidth
            label="City"
            variant="outlined"
            value={city}
            onChange={handleCityChange}
          />
          <TextField
            fullWidth
            label="Country"
            variant="outlined"
            value={country}
            onChange={handleCountryChange}
            style={{ marginTop: "10px" }}
          />
          <Button
            variant="contained"
            color="primary"
            style={{ marginTop: "10px" }}
            onClick={handleSubmit}
          >
            Submit
          </Button>
        </CardContent>
      </Card>
      <Card elevation={3} style={{ borderRadius: "15px", flex: "1" }}>
        <CardContent>
          <Typography variant="h6">Weather Information</Typography>
          <Typography variant="body1">
            Temperature: {temperature} {unit}
          </Typography>
          <Typography variant="body1">Wind Speed: {windSpeed} m/s</Typography>
          <ButtonGroup style={{ marginTop: "10px" }}>
            <Button
              variant={unit === "Celsius" ? "contained" : "outlined"}
              onClick={() => handleUnitChange("Celsius")}
            >
              Celsius
            </Button>
            <Button
              variant={unit === "Fahrenheit" ? "contained" : "outlined"}
              onClick={() => handleUnitChange("Fahrenheit")}
            >
              Fahrenheit
            </Button>
          </ButtonGroup>
        </CardContent>
      </Card>
    </Container>
  );
};

export default Weather;
