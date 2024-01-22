import React, { useState } from "react";
import { TextField, Button, Grid, Typography } from "@mui/material";

const LocationForm = ({ getWeatherData }) => {
  const [cityName, setCityName] = useState("");
  const [countryName, setCountryName] = useState("");
  const [error, setError] = useState("");

  const handleInputChange = (e, setterFunction, pattern) => {
    const value = e.target.value;
    // const trimmedValue = value.trim();
    if (value.match(pattern) || value === "") {
      setterFunction(value);
      setError("");
    } else {
      setError("Please enter valid characters (a-z or A-Z) and spaces only.");
    }
  };

  const handleSubmit = () => {
    if (cityName.trim() === "" || countryName.trim() === "") {
      setError("Please fill in all fields.");
    } else {
      // Handle form submission logic here
      const trimmedCityName = cityName.trim();
      const trimmedCountryName = countryName.trim();
      getWeatherData(trimmedCityName, trimmedCountryName);
      console.log("Form submitted:", { trimmedCityName, trimmedCountryName });
      setCityName("");
      setCountryName("");
      setError("");
    }
  };

  const handleReset = () => {
    setCityName("");
    setCountryName("");
    setError("");
  };

  return (
    <Grid container spacing={2} alignItems="center" justifyContent="center">
      <Grid item xs={6}>
        <TextField
          label="City Name"
          variant="outlined"
          fullWidth
          value={cityName}
          onChange={(e) => handleInputChange(e, setCityName, /^[a-zA-Z\s]*$/)}
        />
      </Grid>
      <Grid item xs={6}>
        <TextField
          label="Country Name"
          variant="outlined"
          fullWidth
          value={countryName}
          onChange={(e) =>
            handleInputChange(e, setCountryName, /^[a-zA-Z\s]*$/)
          }
        />
      </Grid>
      <Grid item xs={12}>
        {error && <Typography color="error">{error}</Typography>}
      </Grid>
      <Grid
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
        }}
      >
        <Button
          variant="contained"
          color="primary"
          onClick={handleSubmit}
          style={{ margin: "5px" }}
        >
          Submit
        </Button>
        <Button
          variant="outlined"
          color="secondary"
          onClick={handleReset}
          style={{ margin: "5px" }}
        >
          Reset
        </Button>
      </Grid>
    </Grid>
  );
};

export default LocationForm;
