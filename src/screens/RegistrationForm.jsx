import React, { useState } from "react";
import Container from "@mui/material/Container";
import Paper from "@mui/material/Paper";
import Avatar from "@mui/material/Avatar";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import PersonIcon from "@mui/icons-material/Person";
import { v4 as uuidv4 } from "uuid";
import axios from "axios";

const RegistrationForm = (props) => {
  const { setIsUserValid, setIsLoading, setUserData } = props;
  const uniqueId = uuidv4();
  const [formData, setFormData] = useState({
    id: uniqueId,
    name: "",
    username: "",
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setErrors({ ...errors, [name]: "" });
  };

  const validateForm = () => {
    let valid = true;
    const newErrors = {};

    // Validate Username
    if (!/^(?=.*[a-zA-Z])(?=.*\d)[a-zA-Z0-9]{6,16}$/.test(formData.username)) {
      newErrors.username =
        "Username must be 6-16 characters, and include both letters and numbers";
      valid = false;
    }

    // Validate Password
    if (
      !/(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#$%^&*()_+])[A-Za-z\d!@#$%^&*()_+]{8,32}/.test(
        formData.password
      )
    ) {
      newErrors.password =
        "Password must be 8-32 characters, at least one letter, one number, and a combination of uppercase, lowercase, and special characters";
      valid = false;
    }

    // Validate Email
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Invalid email address";
      valid = false;
    }

    // Validate Name
    if (formData.name.trim() === "") {
      newErrors.name = "Name cannot be empty";
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  const registerUser = async (formData) => {
    setIsLoading(true);
    try {
      const response = await axios.post(`/api/v1/auth/registeruser/`, formData);
      if (response.status === 200) {
        setIsUserValid(true);
        setUserData({
          functionType: "register",
          username: response.data.user.username,
          qrImage: response.data.user.qrImage,
        });
        setFormData({
          id: "",
          name: "",
          username: "",
          email: "",
          password: "",
        });
      } else {
        setIsUserValid(false);
      }
      setIsLoading(false);
    } catch (error) {
      setIsUserValid(false);
      setIsLoading(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      registerUser(formData);
    }
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
          <PersonIcon />
        </Avatar>
        <h2>New User Registartion</h2>
        <form onSubmit={handleSubmit} style={{ width: "100%" }}>
          <TextField
            label="Name"
            variant="outlined"
            name="name"
            margin="normal"
            fullWidth
            value={formData.name}
            onChange={handleChange}
            error={!!errors.name}
            helperText={errors.name}
            required
          />
          <TextField
            label="Username"
            variant="outlined"
            name="username"
            value={formData.username}
            onChange={handleChange}
            fullWidth
            margin="normal"
            error={!!errors.username}
            helperText={errors.username}
            required
          />
          <TextField
            label="Email"
            variant="outlined"
            name="email"
            value={formData.email}
            onChange={handleChange}
            fullWidth
            margin="normal"
            error={!!errors.email}
            helperText={errors.email}
            required
          />
          <TextField
            label="Password"
            variant="outlined"
            name="password"
            type="password"
            value={formData.password}
            onChange={handleChange}
            fullWidth
            margin="normal"
            error={!!errors.password}
            helperText={errors.password}
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
              Register
            </Button>
          </div>
        </form>
      </Paper>
    </Container>
  );
};

export default RegistrationForm;
