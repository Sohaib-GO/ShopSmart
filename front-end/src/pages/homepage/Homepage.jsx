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
          onClick={() => navigate("/search-items")}
        >
          <Typography variant="h6" gutterBottom class="start-searching-btn">
            Start Searching
            <style>
              @import
              url('https://fonts.googleapis.com/css2?family=Anton&display=swap');
            </style>
          </Typography>
        </Button>
      </div>
    </div>
  );
}

export default Homepage;
