import React, { useState } from "react";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
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
  let currentPage = location.pathname.substring(1);

  const tabs = [
    { value: "searchItems", label: "Search items" },
    { value: "listings", label: "Grocery List" },
  ];

  return (
    <Box className="header">
      <Box className="header__left">
        <img
          className="header__logo"
          src={logo}
          alt="logo"
          onClick={() => navigate("/")}
        />
        <Typography
          className="header__title"
          variant="h6"
          onClick={() => navigate("/")}
        >
          CartShare
        </Typography>
      </Box>
      <Box className="header__center">
        <ColoredTabs
          tabs={tabs}
          currentPage={currentPage}
          navigate={navigate}
        />
      </Box>
      <Box className="header__right">
        {isLoggedIn ? (
          <Box className="header__right__loggedIn">
            <Typography variant="h6" className="header__right__loggedIn__name">
              {user.name}
            </Typography>
            <Button
              className="header__right__loggedIn__logout"
              variant="contained"
              onClick={handleLogout}
            >
              Logout
            </Button>
          </Box>
        ) : (
          <Button
            className="header__right__login"
            variant="contained"
            onClick={() => setSignInDrawerOpen(true)}
          >
            Login
          </Button>
        )}
      </Box>
      {signInDrawerOpen && (
        <ClickAwayListener onClickAway={() => setSignInDrawerOpen(false)}>
          <Box className="header__signInDrawer">
            <Typography
              variant="h5"
              className="header__signInDrawer__title"
            ></Typography>
            <form
              className="header__signInDrawer__form"
              onSubmit={handleSubmit}
            >
              <TextField
                className="header__signInDrawer__form__email"
                label="Email"
                variant="outlined"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <TextField
                className="header__signInDrawer__form__password"
                label="Password"
                variant="outlined"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <Button
                className="header__signInDrawer__form__submit"
                variant="contained"
                type="submit"
              >
                Login
              </Button>
            </form>
          </Box>
        </ClickAwayListener>
      )}
    </Box>
  );
}

export default Header;
