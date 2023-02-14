import React, { useState, useEffect } from "react";
import axios from "axios";
import { TextField, Container, Button } from "@mui/material";


const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    address: "",
    lat: "",
    lng: "",
  });



  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const { name, email, password, address, lat, lng } = formData; // Destructure the state

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value }); // Spread operator to copy the existing state and then update the state

  useEffect(() => {
    const fetchLatLng = async () => {
      const response = await axios.get(
        `https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=${process.env.REACT_APP_GOOGLE_MAPS_API_KEY}`
      );
      const { lat, lng } = response.data.results[0].geometry.location; // Destructure lat and lng from the response
      setFormData({ ...formData, lat, lng }); // Update the state with the lat and lng
    };

    if (address) {
      fetchLatLng();
    }
  }, [address]);

  const onSubmit = async (e) => {
    e.preventDefault();

    try {
      const newUser = { name, email, password, address, lat, lng };

      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };

      const body = JSON.stringify(newUser);

      const res = await axios.post("/api/users/", body, config);

      setShowSuccessMessage(true);
      // Redirect to login page
      setTimeout(() => {
        window.location.href = "/home";
      }, 3000);
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
      {errorMessage && (
        <div className="alert alert-danger mt-3">{errorMessage}</div>
      )}
    </Container>
  );
};

export default Register;
