import React, { useState, useEffect } from "react";
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
import Badge from "@mui/material/Badge";
import Divider from "@mui/material/Divider";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import { Search } from "@mui/icons-material";
import { Drawer } from "@mui/material";
import useLogin from "../../components/authentication/useLogin";
import Autocomplete from "@mui/material/Autocomplete";
import DoneOutlineIcon from "@mui/icons-material/DoneOutline";
import logo from "../../images/cartlogo.png";

import axios from "axios";

const productName = { inputProps: { "aria-productName": "Switch demo" } };

function SearchItems(props) {
  const [dense, setDense] = useState(false);
  const [items, setItems] = useState([]);
  const [savedItems, setSavedItems] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [store, setStore] = useState([]);
  const [item, setItem] = useState();
  const { isLoggedIn } = useLogin(props);

  const products = [
    { productName: "apple" },
    { productName: "orange" },
    { productName: "tomatto" },
    { productName: "cucumber" },
    { productName: "carrot" },
    { productName: "lettuce" },
    { productName: "milk" },
    { productName: "eggs" },
    { productName: "egg white" },
    { productName: "coffe" },
    { productName: "chockolate" },
    { productName: "ice-cream" },
    { productName: "pine-apple" },
    { productName: "watermelon" },
    { productName: "cherry" },
    { productName: "melon" },
    { productName: "water" },
    { productName: "beef" },
    { productName: "pork" },
    { productName: "chicken tenders" },
    { productName: "whole chicken" },
    { productName: "chicken breast" },
    { productName: "red grape" },
    { productName: "rasberry" },
    { productName: "bluberry" },
    { productName: "strawberry" },
  ];

  useEffect(() => {
    fetch("/api/items")
      .then((res) => res.json())
      .then((data) => setItems(data))
      .catch((error) => console.error(error));
    // Fetching user list
    fetch("/api/fetch-grocery-list")
      .then((res) => res.json())
      .then((data) => setSavedItems(data.data));
  }, []);

  const handleDeleteGroceryItem = async (item_name, store_name) => {
    try {
      const response = await axios.post("/api/delete-grocery-item", {
        item_name,
        store_name,
      });
      if (response.data.success) {
        setSavedItems((prevGroceryList) =>
          prevGroceryList.filter((store) => {
            store.items = store.items.filter(
              (item) => item.item_name !== item_name
            );
            return store.items.length > 0;
          })
        );
      }
    } catch (err) {
      console.error(err);
    }
  };

  const getCheapestStore = (stores) => {
    return stores.reduce((min, curr) => (curr.price < min.price ? curr : min));
  };

  const filteredItems = Object.keys(items).filter((itemName) =>
    itemName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getSavedItem = (item) => {
    if (!savedItems) return;
    for (const el of savedItems) {
      const storeSavedProducts = el.items;
      for (const storeProduct of storeSavedProducts) {
        if (storeProduct.item_name === item) return el;
      }
    }
  };

  const handleAddToGroceryList = async (itemName) => {
    if (!isLoggedIn) {
      alert("Please login to add items to your grocery list");
      return;
    }

    const { stores } = items[itemName];
    const cheapestStore = getCheapestStore(stores);
    const { store_name, price } = cheapestStore;

    try {
      const response = await fetch("/api/add-to-grocery-list", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ item_name: itemName, store_name, price }),
      });
      const result = await response.json();
      console.log("result", savedItems);

      if (!result.success) {
        throw new Error(result.message);
      }

      const newItem = {
        items: [{ item_name: itemName }],
        store_name,
        price,
      };
      setSavedItems((prev) => [...prev, newItem]);
    } catch (error) {
      console.error(error);
      alert(error.message);
    }
  };

  return (
    <div className="searchItems-page">
      <div className="store-table">
        <div className="search-field">
          <Autocomplete
            id="search-autocomplete"
            disableCloseOnSelect
            options={products}
            getOptionLabel={(option) => option.productName}
            blurOnSelect
            defaultValue=""
            value={{ productName: searchTerm }}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Search product"
                variant="standard"
              />
            )}
            onInputChange={(e, newValue) => {
              if (typeof newValue === "string") {
                setSearchTerm(newValue);
              } else {
                setSearchTerm(newValue.productName);
              }
            }}
          />
        </div>
        <div>
          <Grid item xs={12} md={6}>
            {filteredItems.length > 0 && (
              <Typography sx={{ mt: 4, mb: 2 }} variant="body1" component="div">
                Search results
              </Typography>
            )}
            <List dense={dense}>
              {filteredItems.map((itemName) => {
                const { item_image, stores, id } = items[itemName];
                const { price } = getCheapestStore(stores);
                const savedItem = getSavedItem(itemName);

                return (
                  <ListItem
                    id={id}
                    key={`list-item-${id}`}
                    secondaryAction={
                      <Box
                        sx={{
                          "& > :not(style)": {
                            m: 2,
                          },
                        }}
                      >
                        {!savedItem ? (
                          <IconButton
                            onClick={() => handleAddToGroceryList(itemName)}
                            edge="end"
                            aria-productName="add"
                          >
                            <AddCircleOutlineIcon color="success" />
                          </IconButton>
                        ) : (
                          <IconButton
                            onClick={() =>
                              handleDeleteGroceryItem(
                                itemName,
                                savedItem.store_name
                              )
                            }
                            edge="end"
                            aria-productName="add"
                          >
                            <DoneOutlineIcon color="success" />
                          </IconButton>
                        )}
                      </Box>
                    }
                  >
                    <ListItemAvatar
                      className="store-logo-avatar"
                      onClick={() => setItem(items[itemName])}
                    >
                      <Avatar src={item_image} />
                    </ListItemAvatar>
                    <ListItemText className="item-name" primary={itemName} />
                    <ListItemText primary={`$${price}`} />
                  </ListItem>
                );
              })}
            </List>
          </Grid>
        </div>
      </div>
      <Drawer anchor="right" open={!!item} onClose={() => setItem(null)}>
        {item && (
          <Card sx={{ maxWidth: 700, minWidth: 300 }}>
            <CardMedia
              className="item-image"
              component="img"
              image={item.item_image}
              alt={item.name}
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                {item.name}
              </Typography>
              <Typography variant="body2" color="textSecondary" component="p">
                {item.description}
              </Typography>
              <Divider />
              <Typography variant="body1" component="div">
                Stores Selling the Item:
              </Typography>
              <List dense={dense}>
                {item.stores &&
                  item.stores.map((store, index) => {
                    const cheapestStore = getCheapestStore(item.stores);
                    return (
                      <ListItem key={index} className="store-list-item">
                        <Badge
                          overlap="rectangular"
                          anchorOrigin={{
                            vertical: "bottom",
                            horizontal: "right",
                          }}
                          badgeContent={
                            <Typography variant="subtitle1">
                              {store.store_name}
                            </Typography>
                          }
                        >
                          <Avatar
                            src={store.store_logo}
                            sx={{ width: 56, height: 56 }}
                          />
                        </Badge>
                        <Typography
                          style={
                            store.store_name === cheapestStore.store_name
                              ? { color: "red" }
                              : {}
                          }
                        >
                          {store.price}
                        </Typography>
                      </ListItem>
                    );
                  })}
              </List>
            </CardContent>
          </Card>
        )}
      </Drawer>
    </div>
  );
}

export default SearchItems;
