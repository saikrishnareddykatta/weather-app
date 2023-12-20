import React, { useState } from "react";
import { Container, Paper, Tabs, Tab, Box, Typography } from "@mui/material";
import LoginForm from "./LoginForm";
import RegistrationForm from "./RegistrationForm";

const SignInForm = (props) => {
  const { setIsUserValid, setIsLoading, setUserData } = props;
  const [selectedTab, setSelectedTab] = useState(0);

  const handleTabChange = (event, newValue) => {
    setSelectedTab(newValue);
  };

  return (
    <Container component="main" maxWidth="xs">
      <Paper elevation={3} style={{ padding: 20, marginTop: 50 }}>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Typography variant="h6" gutterBottom>
            Welcome to Weather Vue Hub
          </Typography>
        </div>
        <Tabs
          value={selectedTab}
          onChange={handleTabChange}
          indicatorColor="primary"
          textColor="primary"
          centered
        >
          <Tab label="Login" />
          <Tab label="Register" />
        </Tabs>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          {selectedTab === 0 && (
            <LoginForm
              setIsUserValid={setIsUserValid}
              setIsLoading={setIsLoading}
              setUserData={setUserData}
            />
          )}
          {selectedTab === 1 && (
            <RegistrationForm
              setIsUserValid={setIsUserValid}
              setIsLoading={setIsLoading}
              setUserData={setUserData}
            />
          )}
        </Box>
      </Paper>
    </Container>
  );
};

export default SignInForm;
