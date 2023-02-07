import * as React from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import { useNavigate } from "react-router-dom";

function ColoredTabs({ tabs }) {
  const [value, setValue] = React.useState("one");

  const navigate = useNavigate();

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: "100%" }}>
      <Tabs
        value={value}
        onChange={handleChange}
        textColor="inherit"
        indicatorColor="secondary"
        aria-label="secondary tabs example"
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
