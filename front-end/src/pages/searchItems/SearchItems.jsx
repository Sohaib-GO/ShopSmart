import React, { useState } from "react";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";
import "./SearchItems.css";
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
import { green } from "@mui/material/colors";
import Icon from "@mui/material/Icon";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import { Search } from "@mui/icons-material";

const mockData = [
  {
    id: "1",
    name: "apple",
    price: "5.00",
    img: "https://i5.walmartimages.ca/images/Enlarge/094/514/6000200094514.jpg",
    storeLogo: "https://www.freepnglogos.com/uploads/walmart-logo-24.jpg",
  },
  {
    id: "2",
    name: "orange",
    price: "3.00 ",
    img: "https://i5.walmartimages.ca/images/Enlarge/234/6_r/6000191272346_R.jpg",
    storeLogo:
      "https://logos-world.net/wp-content/uploads/2020/11/Costco-Wholesale-Emblem.png",
  },
  {
    id: "3",
    name: "avocado",
    price: "52.00",
    img: "https://i.etsystatic.com/34286555/r/il/09e59c/4049202539/il_1588xN.4049202539_59d3.jpg",
    storeLogo:
      "https://logos-world.net/wp-content/uploads/2022/01/Safeway-Logo.png",
  },
  { id: "4", name: "bananna", price: "4.25" },
  { id: "5", name: "coffee", price: "7.30" },
  { id: "6", name: "water", price: "11.99" },
  { id: "7", name: "milk", price: "5.50" },
  { id: "8", name: "eggs", price: "14.99" },
];

const label = { inputProps: { "aria-label": "Switch demo" } };

function SearchItems({ setListings }) {
  const [dense, setDense] = useState(false);
  const [item, setItem] = useState(null);

  function addItems(item) {
    setListings((prev) => [...prev, item]);
  }

  return (
    <div className="searchItems-page">
      <div className="store-table">
        <div className="search-field">
          <TextField
            id="filled-basic"
            variant="standard"
            placeholder="search"
          />
          <FormGroup className="search-radio-button">
            <FormControlLabel
              control={<Switch defaultChecked />}
              label="Within 10km"
            />
          </FormGroup>
        </div>
        <div>
          <Grid item xs={12} md={6}>
            <Typography
              sx={{ mt: 4, mb: 2 }}
              variant="h6"
              component="div"
            ></Typography>
            <List dense={dense}>
              {mockData.map((mock) => {
                return (
                  <ListItem
                    id={mock.id}
                    key={`list-item-${mock.id}`}
                    secondaryAction={
                      <Box
                        sx={{
                          "& > :not(style)": {
                            m: 2,
                          },
                        }}
                      >
                        <IconButton
                          onClick={() => addItems(mock)}
                          edge="end"
                          aria-label="add"
                        >
                          <AddCircleOutlineIcon color="success" />
                        </IconButton>
                      </Box>
                    }
                  >
                    <ListItemAvatar
                      className="store-logo-avatar"
                      onClick={() => setItem(mock)}
                    >
                      <Avatar src={storeLogo} />
                    </ListItemAvatar>
                    <ListItemText className="item-name" primary={mock.name} />
                    <ListItemText primary={`${mock.price}$`} />
                  </ListItem>
                );
              })}
            </List>
          </Grid>
        </div>
      </div>
      {item && (
        <div className="drawer">
          <Card sx={{ maxWidth: 345 }}>
            <CardMedia
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
                item info differnt store item info differnt store item info
                differnt store
              </Typography>
            </CardContent>

            <CardActions>
              <Button
                onClick={() => addItems(item)}
                size="small"
                color="success"
              >
                Save
              </Button>
            </CardActions>
          </Card>
        </div>
      )}
    </div>
  );
}

export default SearchItems;