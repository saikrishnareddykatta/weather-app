import React, { useState, useEffect } from "react";
import { CircularProgress } from "@mui/material";
import Weather from "./screens/Weather";
import SignInForm from "./screens/SignInForm";
import AuthCode from "./screens/AuthCode";
import { geoLocation } from "./utils/helper";

function App() {
  const [isUserValid, setIsUserValid] = useState(false);
  const [isTwoFactorValid, setIsTwoFactorValid] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [userData, setUserData] = useState({});
  const [userGeoLocation, setUserGeoLocation] = useState({});
  const [userLocation, setUserLocation] = useState();

  const getLocation = async () => {
    const locationDetails = await geoLocation();
    const { errorMessage } = locationDetails;
    if (!errorMessage) {
      const { latitude, longitude } = locationDetails;
      setUserGeoLocation({
        latitude,
        longitude,
      });
    } else {
      console.log("***locationDetailsApp.js", errorMessage);
    }
  };

  useEffect(() => {
    getLocation();
  }, []);

  return (
    <div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        {isLoading && <CircularProgress size={48} color="secondary" />}
      </div>
      {!isLoading && !isUserValid && (
        <SignInForm
          setIsUserValid={setIsUserValid}
          setIsLoading={setIsLoading}
          setUserData={setUserData}
        />
      )}
      {!isLoading && isUserValid && !isTwoFactorValid && (
        <AuthCode
          userData={userData}
          userGeoLocation={userGeoLocation}
          setUserData={setUserData}
          setIsTwoFactorValid={setIsTwoFactorValid}
          setIsLoading={setIsLoading}
          setUserLocation={setUserLocation}
        />
      )}
      {!isLoading && isUserValid && isTwoFactorValid && (
        <Weather username={userData} userLocation={userLocation} />
      )}
    </div>
  );
}

export default App;
