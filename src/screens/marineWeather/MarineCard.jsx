import React from "react";
import { CardContent, Typography } from "@mui/material";
import {
  commonTypographyStyle,
  assessSurfingConditions,
} from "../../utils/helper";

const MarineCard = ({ marineWeather }) => {
  const { errorMessage, data } = marineWeather;
  return (
    <CardContent>
      <Typography variant="h5" component="div" style={{ textAlign: "center" }}>
        Marine Weather
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
          No Marine Data available for this Location
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
            {assessSurfingConditions(
              marineWeather?.data?.currentMarineWeather?.waveHeight,
              marineWeather?.data?.currentMarineWeather?.wavePeriod,
              marineWeather?.data?.currentMarineWeather?.windWaveHeight,
              marineWeather?.data?.currentMarineWeather?.swellWaveHeight
            )}
          </Typography>
          <Typography {...commonTypographyStyle}>
            <span style={{ fontWeight: "bold" }}>Elevation:</span>{" "}
            {marineWeather?.data?.elevation}
          </Typography>
          <Typography {...commonTypographyStyle}>
            <span style={{ fontWeight: "bold" }}>Wave Height:</span>{" "}
            {marineWeather?.data?.currentMarineWeather?.waveHeight}
            {marineWeather?.data?.currentMarineUnits?.waveHeight}
          </Typography>
          <Typography {...commonTypographyStyle}>
            <span style={{ fontWeight: "bold" }}>Wave Direction:</span>{" "}
            {marineWeather?.data?.currentMarineWeather?.waveDirection}
            {marineWeather?.data?.currentMarineUnits?.waveDirection}
          </Typography>
          <Typography {...commonTypographyStyle}>
            <span style={{ fontWeight: "bold" }}>Wave Period:</span>{" "}
            {marineWeather?.data?.currentMarineWeather?.wavePeriod}
            {marineWeather?.data?.currentMarineUnits?.wavePeriod}
          </Typography>
          <Typography {...commonTypographyStyle}>
            <span style={{ fontWeight: "bold" }}>Wind Wave Height:</span>{" "}
            {marineWeather?.data?.currentMarineWeather?.windWaveHeight}
            {marineWeather?.data?.currentMarineUnits?.windWaveHeight}
          </Typography>
          <Typography {...commonTypographyStyle}>
            <span style={{ fontWeight: "bold" }}>Wind Wave Direction:</span>{" "}
            {marineWeather?.data?.currentMarineWeather?.windWaveDirection}
            {marineWeather?.data?.currentMarineUnits?.windWaveDirection}
          </Typography>
          <Typography {...commonTypographyStyle}>
            <span style={{ fontWeight: "bold" }}>Wind Wave Period:</span>{" "}
            {marineWeather?.data?.currentMarineWeather?.windWavePeriod}
            {marineWeather?.data?.currentMarineUnits?.windWavePeriod}
          </Typography>
          <Typography {...commonTypographyStyle}>
            <span style={{ fontWeight: "bold" }}>Wind Wave Wake Period:</span>{" "}
            {marineWeather?.data?.currentMarineWeather?.windWavePeakPeriod}
            {marineWeather?.data?.currentMarineUnits?.windWavePeakPeriod}
          </Typography>
          <Typography {...commonTypographyStyle}>
            <span style={{ fontWeight: "bold" }}>Swell Wave Height:</span>{" "}
            {marineWeather?.data?.currentMarineWeather?.swellWaveHeight}
            {marineWeather?.data?.currentMarineUnits?.swellWaveHeight}
          </Typography>
          <Typography {...commonTypographyStyle}>
            <span style={{ fontWeight: "bold" }}>Swell Wave Direction:</span>{" "}
            {marineWeather?.data?.currentMarineWeather?.swellWaveDirection}
            {marineWeather?.data?.currentMarineUnits?.swellWaveDirection}
          </Typography>
          <Typography {...commonTypographyStyle}>
            <span style={{ fontWeight: "bold" }}>Swell Wave Period:</span>{" "}
            {marineWeather?.data?.currentMarineWeather?.swellWavePeriod}
            {marineWeather?.data?.currentMarineUnits?.swellWavePeriod}
          </Typography>
          <Typography {...commonTypographyStyle}>
            <span style={{ fontWeight: "bold" }}>Swell Wave Wake Period:</span>{" "}
            {marineWeather?.data?.currentMarineWeather?.swellWavePeakPeriod}
            {marineWeather?.data?.currentMarineUnits?.swellWavePeakPeriod}
          </Typography>
        </div>
      )}
    </CardContent>
  );
};
export default MarineCard;
