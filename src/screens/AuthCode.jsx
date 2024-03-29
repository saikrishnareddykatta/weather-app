import React, { useState, useEffect, useCallback } from "react";
import { Container, Paper, Box, Button, TextField } from "@mui/material";
import axios from "axios";
import QRImage from "../utils/QRImage";

const AuthCode = (props) => {
  const [userCode, setUserCode] = useState();
  const [displayText, setDisplayText] = useState("");
  const [showQRCode, setShowQRCode] = useState(false);
  const [qrImageURL, setQRImageURL] = useState("");
  const [error, setError] = useState(false);
  const [helperMessage, setHelperMessage] = useState("");
  const {
    userData,
    userGeoLocation,
    setIsTwoFactorValid,
    setIsLoading,
    setUserData,
    setUserLocation,
  } = props;
  const { functionType, username, twoFactorEnabled } = userData;

  const verifyAuthCode = useCallback(() => {
    if (functionType === "login") {
      if (twoFactorEnabled) {
        setDisplayText("Please Enter the 2FA Code");
        setShowQRCode(false);
      } else {
        const { qrImage } = userData;
        setDisplayText(
          "Looks like you haven't enable 2FA. Please enable 2FA with any Authenticator App"
        );
        setShowQRCode(true);
        setQRImageURL(qrImage);
      }
    } else {
      const { qrImage } = userData;
      setQRImageURL(qrImage);
      setDisplayText("Please Register 2FA with any Authenticator App");
      setShowQRCode(true);
    }
  }, [functionType, twoFactorEnabled, userData]);

  //Call An API to get user's City, State and Country
  const getCityDetails = async () => {
    // setIsLoading(true);
    console.log("***userGeoLocation", userGeoLocation);
    if (Object.keys(userGeoLocation).length > 0) {
      const payload = {
        latitude: userGeoLocation.latitude,
        longitude: userGeoLocation.longitude,
      };
      try {
        const response = await axios.post(
          "/api/v1/weather/cityDetails",
          payload
        );
        if (response.status === 200) {
          setUserLocation(response.data);
        } else {
          setUserLocation({});
        }
      } catch (error) {
        setUserLocation({});
      }
    }
    setIsLoading(false);
  };

  const handleSubmit = async () => {
    setIsLoading(true);
    try {
      await getCityDetails();
      if (functionType === "login") {
        if (twoFactorEnabled) {
          const payload = {
            username,
            code: userCode,
          };
          const response = await axios.post(
            "/api/v1/auth/verifytwoauth",
            payload
          );
          if (response.status === 200) {
            setIsTwoFactorValid(true);
            setError(false);
            setUserData(response.data.user.username);
          } else {
            setError(true);
            setHelperMessage("Please enter the valid 2FA code");
            setUserCode("");
            setIsTwoFactorValid(false);
          }
        } else {
          const payload = {
            username,
            code: userCode,
          };
          const response = await axios.post(
            `/api/v1/auth/setuptwofactor`,
            payload
          );
          if (response.status === 200) {
            setIsTwoFactorValid(true);
            setError(false);
            setUserData(response.data.user.username);
          } else {
            setError(true);
            setHelperMessage("Please enter the valid 2FA code");
            setUserCode("");
            setIsTwoFactorValid(false);
          }
        }
      } else {
        const payload = {
          username,
          code: userCode,
        };
        const response = await axios.post(
          `/api/v1/auth/setuptwofactor`,
          payload
        );
        if (response.status === 200) {
          setIsTwoFactorValid(true);
          setError(false);
          setUserData(response.data.user.username);
        } else {
          setError(true);
          setHelperMessage("Please enter the valid 2FA code");
          setUserCode("");
          setIsTwoFactorValid(false);
        }
      }
      setIsLoading(false);
    } catch (error) {
      setError(true);
      setHelperMessage("Please enter the valid 2FA code");
      setUserCode("");
      setIsTwoFactorValid(false);
      setIsLoading(false);
    }
  };

  // const fetchData = () => {
  //   console.log("***gettingRepeated");
  //   getCityDetails();
  //   verifyAuthCode();
  // };

  useEffect(() => {
    verifyAuthCode();
  }, [verifyAuthCode]);

  return (
    <Container component="main" maxWidth="xs">
      <Paper
        elevation={3}
        sx={{
          padding: 3,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <h2>{displayText}</h2>
        {showQRCode && (
          <Box mt={2}>
            <QRImage imageURL={qrImageURL} />
          </Box>
        )}
        <TextField
          label="Enter Number"
          variant="outlined"
          fullWidth
          margin="normal"
          value={userCode}
          error={error}
          helperText={helperMessage}
          onChange={(e) => setUserCode(e.target.value)}
        />
        <Box mt={2}>
          <Button variant="contained" color="primary" onClick={handleSubmit}>
            Submit
          </Button>
        </Box>
      </Paper>
    </Container>
  );
};

export default AuthCode;
