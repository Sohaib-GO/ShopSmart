import React, { useState } from "react";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import Title from "../../components/Title/Title";

import "./Homepage.css";

function Homepage() {
  const navigate = useNavigate();

  return (
    <div className="homepage">
      <Title />
      <div className="get_started_button">
        <Button
          variant="text"
          color="success"
          className="search-button"
          onClick={() => navigate("/listings")}
        >
          <Typography variant="h6" gutterBottom>
            Start Searching
          </Typography>
        </Button>
      </div>
    </div>
  );
}

export default Homepage;
