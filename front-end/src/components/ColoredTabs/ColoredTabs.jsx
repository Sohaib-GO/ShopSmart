import * as React from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import { useNavigate, useLocation } from "react-router-dom";

function ColoredTabs({ tabs }) {
  const [value, setValue] = React.useState("");

  const navigate = useNavigate();
  let location = useLocation();

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  React.useEffect(() => {
    if (location.pathname === "/") setValue("");
    else if (!value) setValue(location.pathname.substring(1));
  }, [location.pathname]);

  return (
    <Box sx={{ width: "100%" }}>
      <Tabs
        value={value}
        onChange={handleChange}
        textColor="inherit"
        indicatorColor="secondary"
      >
        {tabs.map((tab) => {
          return (
            <Tab
              value={tab.value}
              label={tab.label}
              onClick={() => navigate(tab.value)}
            />
          );
        })}
      </Tabs>
    </Box>
  );
}

export default ColoredTabs;
