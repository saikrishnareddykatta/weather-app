import React, { useState } from "react";
import { CircularProgress } from "@mui/material";
import Weather from "./screens/Weather";
import SignInForm from "./screens/SignInForm";
import AuthCode from "./screens/AuthCode";

function App() {
  const [isUserValid, setIsUserValid] = useState(false);
  const [isTwoFactorValid, setIsTwoFactorValid] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [userData, setUserData] = useState({});
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
          setUserData={setUserData}
          setIsTwoFactorValid={setIsTwoFactorValid}
          setIsLoading={setIsLoading}
        />
      )}
      {!isLoading && isUserValid && isTwoFactorValid && (
        <Weather username={userData} />
      )}
    </div>
  );
}

export default App;
