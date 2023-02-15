import React from "react";
import Typography from "@mui/material/Typography";
import "./About.css";

function About() {
  return (
    <div className="about-page">
      <footer className="footer">
        <div className="waves">
          <div className="wave" id="wave1"></div>
          <div className="wave" id="wave2"></div>
          <div className="wave" id="wave3"></div>
          <div className="wave" id="wave4"></div>
        </div>
        <p>
          &copy;2023 Created by Margaryta Lanova | Nicholas James Joe | Sohaib
          Al-Majmaie{" "}
        </p>
      </footer>
    </div>
  );
}

export default About;
