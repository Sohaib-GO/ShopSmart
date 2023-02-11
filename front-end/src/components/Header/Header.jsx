import React, { useState } from "react";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { Divider, Alert, Modal } from "@mui/material";
import TextField from "@mui/material/TextField";
import ClickAwayListener from "@mui/base/ClickAwayListener";
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
    error,
    success,
    isLoggedIn,
    handleSubmit,
    handleLogout,
    setEmail,
    setPassword,
    user,
  } = useLogin(props);

  let location = useLocation();
  const navigate = useNavigate();

  const tabs = [
    { value: "search-items", label: "Search items" },
    { value: "listings", label: "Listings" },
  ];

  return (
    <div className="header">
      <div className="navigation-buttons">
        <img
          src={logo}
          alt="logo"
          className="logo"
          onClick={() => navigate("/")}
        />
        <div className="logo-text">
          ShopSmart{" "}
          <style>
            @import
            url('https://fonts.googleapis.com/css2?family=Pacifico&family=Shadows+Into+Light&display=swap');
          </style>
        </div>
      </div>
      <div>
        <ColoredTabs tabs={tabs} />
      </div>
      <div className="right-buttons-group">
        {isLoggedIn ? (
          <div>
            <Box className="user-name">
              <Typography variant="h6" color="green">
                Hola!&nbsp;&nbsp;
              </Typography>

              <Typography>{user.name}&nbsp;&nbsp;</Typography>

              <Button variant="contained" color="error" onClick={handleLogout}>
                Logout
              </Button>
            </Box>
          </div>
        ) : (
          <Button
            className="sign-in-out-button"
            variant="contained"
            color="success"
            onClick={() => setSignInDrawerOpen(true)}
          >
            Login
          </Button>
        )}
      </div>
      {signInDrawerOpen && !isLoggedIn && (
        <Modal
          open={signInDrawerOpen}
          size="small"
          onClose={() => setSignInDrawerOpen(false)}
        >
          <Box
            className="sign-in-form"
            component="form"
            sx={{
              "& .MuiTextField-root": { m: 1, width: "25ch" },
            }}
            noValidate
            autoComplete="off"
          >
            <div>
              <Typography variant="h5" color="grey">
                Login
              </Typography>
            </div>
            <div className="modal-form">
              <TextField
                required
                className="form-field"
                label="Email"
                id="outlined-size-small"
                size="small"
                placeholder="Enter your email"
                e
                value={email}
                type="email"
                onChange={(e) => setEmail(e.target.value)}
              />
              <TextField
                required
                className="form-field"
                label="Password"
                id="outlined-size-small"
                size="small"
                placeholder="Enter your password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div>
              <Button
                className="form-field"
                disableElevation
                variant="contained"
                color="success"
                onClick={handleSubmit}
              >
                Login
              </Button>
            </div>
            {error ? <Alert severity="error">{error}</Alert> : null}
            <div>
              <Divider variant="fullWidth" />
              <Typography variant="caption">Not a member yet?</Typography>{" "}
              <Typography variant="caption" color="blueviolet">
                Sign Up.
              </Typography>
            </div>
          </Box>
        </Modal>
      )}
    </div>
  );
}

export default Header;
