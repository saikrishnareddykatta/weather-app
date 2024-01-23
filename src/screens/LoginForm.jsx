import React, { useState } from "react";
import Container from "@mui/material/Container";
import Paper from "@mui/material/Paper";
import Avatar from "@mui/material/Avatar";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import axios from "axios";

const LoginForm = (props) => {
  const { setIsLoading, setIsUserValid, setUserData } = props;
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const authenticateUser = async () => {
    setIsLoading(true);
    const payload = {
      username,
      password,
    };
    try {
      const response = await axios.post("/api/v1/auth/userlogin", payload);
      if (response.status === 200) {
        setIsUserValid(true);
        setUserData({
          functionType: "login",
          username: response.data.user.username,
          twoFactorEnabled: response.data.user.twoFactorEnabled,
          qrImage: response.data.user.qrImage,
        });
        setPassword("");
        setUsername("");
      } else {
        setIsUserValid(false);
      }
      setIsLoading(false);
    } catch (error) {
      setIsUserValid(false);
      setIsLoading(false);
    }
  };

  const handleLogin = (e) => {
    e.preventDefault();
    // Add your authentication logic here
    authenticateUser();
  };

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
        <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
          <LockOutlinedIcon />
        </Avatar>
        <h2>Log In</h2>
        <form onSubmit={handleLogin} style={{ width: "100%" }}>
          <TextField
            label="Username"
            variant="outlined"
            margin="normal"
            fullWidth
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          <TextField
            type="password"
            label="Password"
            variant="outlined"
            margin="normal"
            fullWidth
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Button
              type="submit"
              variant="contained"
              color="primary"
              style={{ marginTop: "20px" }}
            >
              Log In
            </Button>
          </div>
        </form>
      </Paper>
    </Container>
  );
};

export default LoginForm;
