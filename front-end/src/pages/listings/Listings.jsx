import React, { useState, useEffect } from "react";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";
import "./Listings.css";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Grid from "@mui/material/Grid";
import FolderIcon from "@mui/icons-material/Folder";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import storeLogo from "../../images/safeway-Logo.png";
import { Button, CardActionArea, CardActions } from "@mui/material";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";

const mockData = [
  {
    id: "1",
    name: "apple",
    price: "5.00",
    img: "https://i5.walmartimages.ca/images/Enlarge/094/514/6000200094514.jpg",
  },
  { id: "2", name: "banana", price: "3.00" },
  { id: "3", name: "caviar", price: "52.00" },
  { id: "4", name: "bread", price: "4.25" },
  { id: "5", name: "rasberry", price: "7.30" },
  { id: "6", name: "chockolate cake", price: "11.99" },
  { id: "7", name: "lemons", price: "5.50" },
  { id: "8", name: "cherry", price: "14.99" },
];

const label = { inputProps: { "aria-label": "Switch demo" } };

function Listings() {
  const [dense, setDense] = useState(false);
  const [items, setItems] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);

  useEffect(() => {
    fetch("/api/items")
      .then((res) => res.json())
      .then((data) => setItems(data));
  }, []);

  return (
    <div className="listings-page">
      <div className="store-table">
        <div className="search-field">
          <TextField id="filled-basic" variant="standard" placeholder="search" />
          <FormGroup className="search-radio-button">
            <FormControlLabel control={<Switch defaultChecked />} label="Within 10km" />
          </FormGroup>
        </div>
        <div>
          <Grid item xs={12} md={6}>
            <Typography sx={{ mt: 4, mb: 2 }} variant="h6" component="div" />
            <List dense={dense}>
              {items.map((item) => {
                return (
                  <ListItem
                    id={item.id}
                    key={`list-item-${item.id}`}
                    secondaryAction={
                      <IconButton edge="end" aria-label="add">
                        <AddShoppingCartIcon color="primary" />
                      </IconButton>
                    }
                  >
                    <ListItemAvatar
                      className="store-logo-avatar"
                      onClick={() => setSelectedItem(item)}
                    >
                      <Avatar src={storeLogo} />
                    </ListItemAvatar>
                    <ListItemText className="item-name" primary={item.name} />
                    <ListItemText primary={`${item.price}$`} />
                  </ListItem>
                );
              })}
            </List>
          </Grid>
        </div>
      </div>
      {selectedItem && (
        <div className="drawer">
          <Card sx={{ maxWidth: 345 }}>
            <CardActionArea>
              <CardMedia
                component="img"
                height="140"
                image={selectedItem.img || "/static/images/cards/contemplative-reptile.jpg"}
                alt="item"
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  {selectedItem.name}
                </Typography>
                <Typography variant="body2" color="textSecondary" component="p">
                  Price: {selectedItem.price}$
                </Typography>
              </CardContent>
            </CardActionArea>
            <CardActions>
              <Button size="small" color="primary">
                Add to Cart
              </Button>
              <Button size="small" color="primary" onClick={() => setSelectedItem(null)}>
                Close
              </Button>
            </CardActions>
          </Card>
        </div>
      )}
    </div>
  );
  
  }

export default Listings;
