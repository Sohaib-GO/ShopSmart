import React from "react";
import Typography from "@mui/material/Typography";
import "./About.css";

function About() {
  return (
    <div className="about-page">
      <body>
        <div>
        <h1 class='title-text'>Coming Soon</h1>
        </div>
        <li class='points-text'>More consistent and wide spread <em>Web scarping</em></li>
        <li class='points-text'>Display <em>savings</em> for users when they check off items</li>
        <li class='points-text'>A mobile-friendly grocery list</li>
        <input class='email-input' type='email' name="email" placeholder="Enter Email Here"/>
        <input class='email-btn' type='submit'/>

      </body>

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
