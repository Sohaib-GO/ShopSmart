import React, { useState } from "react";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import ClickAwayListener from "@mui/base/ClickAwayListener";
import { useLocation, useNavigate } from "react-router-dom";
import "./Header.css";
import logo from "../../images/cartlogo.png";

function Header() {
  const [signInDrawerOpen, setSignInDrawerOpen] = useState(false);
  const [email, setEmail] = useState("");

  let location = useLocation();
  const navigate = useNavigate();
  let currentPage = location.pathname.substring(1);

  return (
    <ClickAwayListener onClickAway={() => setSignInDrawerOpen(false)}>
      <div className="header">
        <div className="navigation-buttons">
          <img
            src={logo}
            alt="logo"
            className="logo"
            onClick={() => navigate("/")}
          />
          <Typography className="logo-text">ShopSmart</Typography>
        </div>
        <div className="right-buttons-group">
          <Typography className="page-name" variant="h6" gutterBottom>
            {currentPage}
          </Typography>
          {signInDrawerOpen ? (
            <Box
              className="sign-in-form"
              component="form"
              sx={{
                "& .MuiTextField-root": { m: 1, width: "25ch" },
              }}
              noValidate
              autoComplete="off"
            >
              <TextField
                label="Email"
                id="outlined-size-small"
                size="small"
                placeholder="Enter your email"
              />
              <TextField
                label="Password"
                id="outlined-size-small"
                size="small"
                placeholder="Enter your password"
              />
            </Box>
          ) : (
            <Button
              variant="contained"
              color="success"
              onClick={() => setSignInDrawerOpen(true)}
            >
              Sign in
            </Button>
          )}
        </div>
      </div>
    </ClickAwayListener>
  );
}

export default Header;
