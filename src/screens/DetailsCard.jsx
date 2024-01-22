import React from "react";
import { CardContent, Typography } from "@mui/material";
import { convertLocalTimestamp } from "../utils/helper";

const DetailsCard = ({ locationDetails }) => {
  const { errorMessage, data } = locationDetails;
  const { formattedLocation, latitude, longitude, timestamps } =
    locationDetails?.data;
  return (
    <CardContent>
      {errorMessage && !data ? (
        <Typography
          color="text.secondary"
          style={{
            textAlign: "center",
            fontWeight: "bold",
            fontSize: "14px",
          }}
        >
          No Location Details are available for this Location
        </Typography>
      ) : (
        <div>
          <Typography
            variant="h5"
            component="div"
            style={{ textAlign: "center" }}
          >
            {formattedLocation}
          </Typography>
          <Typography
            color="text.secondary"
            style={{
              textAlign: "center",
              fontWeight: "bold",
            }}
          >
            {convertLocalTimestamp(timestamps.UTC)}
          </Typography>
          <Typography
            color="text.secondary"
            style={{
              textAlign: "center",
              fontWeight: "bold",
              fontSize: "14px",
            }}
          >
            <span style={{ fontWeight: "bold" }}>Latitude:</span> {latitude},{" "}
            <span style={{ fontWeight: "bold" }}>Longitude:</span> {longitude}
          </Typography>
        </div>
      )}

      {/* <Typography
        color="text.secondary"
        style={{
          textAlign: "center",
          fontWeight: "bold",
          fontSize: "14px",
        }}
      >
        <span style={{ fontWeight: "bold" }}>Elevation:</span> {elevation}{" "}
        meters
      </Typography> */}
    </CardContent>
  );
};

export default DetailsCard;
