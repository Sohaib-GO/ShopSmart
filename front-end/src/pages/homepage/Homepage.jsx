import React, { useState } from "react";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";

import "./Homepage.css";

function Homepage() {
  const navigate = useNavigate();

  return (
    <div className="Homepage">
      <Typography className="text" variant="h6" gutterBottom>
        Discover,Compare & Choose
      </Typography>
      <div className="get_started_button">
        <Button variant="contained" onClick={() => navigate("/listings")}>
          <Typography variant="h6" gutterBottom>
            Start Searching
          </Typography>
        </Button>
      </div>
    </div>
  );
}

export default Homepage;
