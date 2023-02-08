import React, { useState } from "react";
import "./SavedItems.css";
import { Button, CardActionArea, CardActions } from "@mui/material";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";

function SavedItems({ savedItems, setSavedItems }) {
  function removeItems(item) {
    const items = savedItems;
    const filterItems = items.filter(function (el) {
      return el.id !== item.id;
    });
    setSavedItems(filterItems);
  }
  return (
    <div className="saved-items-page">
      {savedItems.map((item) => {
        return (
          <Card sx={{ maxWidth: 345 }}>
            <CardMedia
              key={`saved-item-${item.id}`}
              component="img"
              height="140"
              image={item.img}
              alt={item.name}
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                {item.name}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                DescriptionDescriptionDescriptionDescriptionDescription
                DescriptionDescriptionDescriptionDescriptionDescription
              </Typography>
            </CardContent>

            <CardActions>
              <Button
                onClick={() => removeItems(item)}
                size="small"
                color="warning"
              >
                Delete
              </Button>
            </CardActions>
          </Card>
        );
      })}
    </div>
  );
}

export default SavedItems;
