import React from "react";
import { CardContent, Typography } from "@mui/material";
import { commonTypographyStyle, assessAirQuality } from "../../utils/helper";

const AirQualityCard = ({ airQuality }) => {
  const { errorMessage, data } = airQuality;
  const { airQualityWeather, airQualityUnits } = airQuality?.data;
  return (
    <CardContent>
      <Typography variant="h5" component="div" style={{ textAlign: "center" }}>
        Air Quality
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
          No Air Quality Data available for this Location
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
            {assessAirQuality(airQualityWeather)}
          </Typography>
          <Typography {...commonTypographyStyle}>
            <span style={{ fontWeight: "bold" }}>European AQI:</span>{" "}
            {airQualityWeather?.europeanAQI}
          </Typography>
          <Typography {...commonTypographyStyle}>
            <span style={{ fontWeight: "bold" }}>US AQI:</span>{" "}
            {airQualityWeather?.usAQI}
          </Typography>
          <Typography {...commonTypographyStyle}>
            <span style={{ fontWeight: "bold" }}>Carbon Monoxide:</span>{" "}
            {airQualityUnits?.carbonMonoxide}
          </Typography>
          <Typography {...commonTypographyStyle}>
            <span style={{ fontWeight: "bold" }}>Nitrogen Dioxide:</span>{" "}
            {airQualityUnits?.nitrogenDioxide}
          </Typography>
          <Typography {...commonTypographyStyle}>
            <span style={{ fontWeight: "bold" }}>Sulphur Dioxide:</span>{" "}
            {airQualityUnits?.sulphurDioxide}
          </Typography>
          <Typography {...commonTypographyStyle}>
            <span style={{ fontWeight: "bold" }}>Ozone:</span>{" "}
            {airQualityWeather?.ozone} {airQualityUnits?.ozone}
          </Typography>
          <Typography {...commonTypographyStyle}>
            <span style={{ fontWeight: "bold" }}>Dust:</span>{" "}
            {airQualityWeather?.dust} {airQualityUnits?.dust}
          </Typography>
          <Typography {...commonTypographyStyle}>
            <span style={{ fontWeight: "bold" }}>UV Index:</span>{" "}
            {airQualityWeather?.uvIndex}
          </Typography>
          <Typography {...commonTypographyStyle}>
            <span style={{ fontWeight: "bold" }}>UV Index Clear Sky:</span>{" "}
            {airQualityWeather?.uvIndexClearSky}
          </Typography>
          <Typography {...commonTypographyStyle}>
            <span style={{ fontWeight: "bold" }}>Ammonia:</span>{" "}
            {airQualityWeather?.ammonia !== null
              ? airQualityWeather?.ammonia
              : "N/A"}{" "}
            {airQualityUnits?.ammonia}
          </Typography>
        </div>
      )}
    </CardContent>
  );
};

export default AirQualityCard;
