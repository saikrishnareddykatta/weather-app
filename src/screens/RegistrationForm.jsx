import React, { useState } from "react";
import axios from "axios";
import Paper from "@mui/material/Paper";
import Avatar from "@mui/material/Avatar";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import PersonIcon from "@mui/icons-material/Person";
import Typography from "@mui/material/Typography";
import { v4 as uuidv4 } from "uuid";

const RegistrationForm = (props) => {
  const { setRegistration, setIsLoading, setUserData } = props;
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

  const registerUser = async (userData) => {
    setIsLoading(true);
    try {
      const response = await axios.post(
        "https://cityweather.cyclic.app/register",
        userData
      );
      if (response.status === 200) {
        setRegistration(true);
        setUserData(response.data);
      } else {
        setRegistration(false);
      }
      setIsLoading(false);
    } catch (error) {
      console.error("Registration failed:", error.message);
      setRegistration(false);
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
    <Paper
      elevation={3}
      style={{
        maxWidth: "400px",
        margin: "auto",
        padding: "20px",
        marginTop: "50px",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography variant="h6">New User Registration</Typography>
        <Avatar sx={{ bgcolor: "secondary.main", alignContent: "center" }}>
          <PersonIcon />
        </Avatar>
      </div>
      <form
        onSubmit={handleSubmit}
        style={{ display: "flex", flexDirection: "column" }}
      >
        <TextField
          label="Name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          fullWidth
          margin="normal"
          error={!!errors.name}
          helperText={errors.name}
        />
        <TextField
          label="Username"
          name="username"
          value={formData.username}
          onChange={handleChange}
          fullWidth
          margin="normal"
          error={!!errors.username}
          helperText={errors.username}
        />
        <TextField
          label="Email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          fullWidth
          margin="normal"
          error={!!errors.email}
          helperText={errors.email}
        />
        <TextField
          label="Password"
          name="password"
          type="password"
          value={formData.password}
          onChange={handleChange}
          fullWidth
          margin="normal"
          error={!!errors.password}
          helperText={errors.password}
        />
        <Button
          type="submit"
          variant="contained"
          color="primary"
          style={{ marginTop: "20px" }}
        >
          Register
        </Button>
      </form>
    </Paper>
  );
};

export default RegistrationForm;
