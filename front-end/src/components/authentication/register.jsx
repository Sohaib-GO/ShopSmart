import React, { useState, useEffect } from "react";
import axios from "axios";
import { TextField, Container, Button } from "@mui/material";

const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    address: "",
  });

  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const { name, email, password, address } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();

    try {
      const newUser = { name, email, password, address };

      const config = {
        headers: {
          "Content-Type": "application/json",
        }, 
      };

      const body = JSON.stringify(newUser);

      const res = await axios.post("/api/users", body, config);

      setShowSuccessMessage(true);
      // Redirect to login page
      setTimeout(() => {
        window.location.href = "/home";
      }
      , 3000);

    } catch (err) {
      setErrorMessage(err.response.data.error);
    }
  };

  useEffect(() => {
    setTimeout(() => {
      setErrorMessage("");
    }, 5000);
  }, [errorMessage]);

  return (
    <Container className="mt-5">
      <h2 className="text-center">Register</h2>
      {showSuccessMessage ? (
        <div className="alert alert-success">Registration successful.</div>
      ) : (
        <form onSubmit={(e) => onSubmit(e)}>
          <TextField
            label="Name"
            type="text"
            name="name"
            value={name}
            onChange={(e) => onChange(e)}
            required
          />
          <TextField
            label="Email"
            type="email"
            name="email"
            value={email}
            onChange={(e) => onChange(e)}
            required
          />
          <TextField
            label="Password"
            type="password"
            name="password"
            value={password}
            onChange={(e) => onChange(e)}
            required
            minLength="6"
          />
          <TextField
            label="Address"
            type="text"
            name="address"
            value={address}
            onChange={(e) => onChange(e)}
            required
          />
          <Button type="submit" variant="contained" color="primary">
            Register
          </Button>
        </form>
      )}
      {errorMessage && <div className="error-message">{errorMessage}</div>}
    </Container>
  );
};

export default Register;