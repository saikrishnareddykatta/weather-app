import React, { useState } from "react";
import { CardContent, TextField, Button, Typography } from "@mui/material";

const LocationCard = ({ userLocation, getWeatherData }) => {
  const [city, setCity] = useState("");
  const [country, setCountry] = useState("");
  // const [displayForm, setDisplayForm] = useState(false);

  const handleCityChange = (e) => {
    setCity(e.target.value);
  };

  const handleCountryChange = (e) => {
    setCountry(e.target.value);
  };

  const handleReset = () => {
    setCity("");
    setCountry("");
  };

  const handleSubmit = () => {
    getWeatherData(city, country);
    setCity("");
    setCountry("");
  };

  return (
    <CardContent>
      <Typography variant="h6">Enter Location: </Typography>
      <div style={{ display: "flex", flexDirection: "column" }}>
        <TextField
          label="City"
          variant="outlined"
          value={city}
          onChange={handleCityChange}
          style={{ marginBottom: "10px" }}
        />
        <TextField
          label="Country"
          variant="outlined"
          value={country}
          onChange={handleCountryChange}
          style={{ marginBottom: "10px" }}
        />
      </div>
      <div style={{ textAlign: "center" }}>
        <Button
          variant="contained"
          color="primary"
          style={{ marginTop: "10px", marginRight: "2px" }}
          onClick={handleSubmit}
        >
          Submit
        </Button>
        <Button
          variant="contained"
          color="primary"
          style={{ marginTop: "10px", marginLeft: "2px" }}
          onClick={handleReset}
        >
          Reset
        </Button>
      </div>
    </CardContent>
  );
};

export default LocationCard;
