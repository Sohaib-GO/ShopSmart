import React, { useState } from "react";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import ClickAwayListener from "@mui/material/ClickAwayListener";
import { useLocation, useNavigate } from "react-router-dom";
import ColoredTabs from "../ColoredTabs/ColoredTabs.jsx";
import "./Header.css";
import logo from "../../images/cartlogo.png";
import useLogin from "../authentication/useLogin";

function Header(props) {
  const [signInDrawerOpen, setSignInDrawerOpen] = useState(false);
  const {
    email,
    password,
    error, // error message from server
    success, // success message if login successful
    isLoggedIn,
    handleLogout,
    handleSubmit,
    setEmail,
    setPassword,
    user,
  } = useLogin(props);
  let location = useLocation();
  const navigate = useNavigate();
  let currentPage = location.pathname.substring(1);

  const tabs = [
    { value: "searchItems", label: "Search items" },
    { value: "listings", label: "Listings" },
  ];

  return (
    <>
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
                onSubmit={handleSubmit}
              >
                <TextField
                  label="Email"
                  id="outlined-size-small"
                  size="small"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <TextField
                  label="Password"
                  id="outlined-size-small"
                  size="small"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <Button
                  className="sign-in-button"
                  variant="contained"
                  type="submit"
                >
                  Sign In
                </Button>
              </Box>
            ) : null}
            {isLoggedIn ? (
              <>
                <div>Hello {user.name}</div>

                <Button
                  className="sign-in-button"
                  variant="contained"
                  onClick={handleLogout}
                >
                  Sign Out
                </Button>
              </>
            ) : (
              <Button
                className="sign-in-button"
                variant="contained"
                onClick={() => setSignInDrawerOpen(!signInDrawerOpen)}
              >
                Sign In
              </Button>
            )}
          </div>
        </div>
      </ClickAwayListener>
    </>
  );
}

export default Header;
