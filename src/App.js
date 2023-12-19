import React, { useState } from "react";
import { CircularProgress } from "@mui/material";
import LoginForm from "./screens/LoginForm";
import RegistrationForm from "./screens/RegistrationForm";

function App() {
  const [registration, setRegistration] = useState(false);
  const [isLogin, setIsLogin] = useState(false);
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
      {!isLoading && !registration && (
        <RegistrationForm
          setRegistration={setRegistration}
          setIsLoading={setIsLoading}
          setUserData={setUserData}
        />
      )}
      {!isLoading && isLogin && (
        <LoginForm
          setIsLoading={setIsLoading}
          setIsLogin={setIsLogin}
          userData={userData}
        />
      )}
    </div>
  );
}

export default App;
