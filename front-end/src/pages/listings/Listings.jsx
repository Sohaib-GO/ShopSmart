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
import { ListSubheader } from "@mui/material";
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import axios from "axios";

import useLogin from "../../components/authentication/useLogin";



const label = { inputProps: { "aria-label": "Switch demo" } };

function Listings(props) {
  const [dense, setDense] = useState(false);
  const [stores, setStores] = useState([]);
  const [selectedStore, setSelectedStore] = useState(null);
  const [groceries, setGroceries] = useState([]);

  const {isLoggedIn} = useLogin(props);

  useEffect(() => {
    fetch("/api/fetch-grocery-list")
      .then((res) => res.json())
      .then((data) => setGroceries(data.data));
  }, []);

  const handleDeleteGroceryItem = async (item_name, store_name) => {
    try {
      const response = await axios.post("/api/delete-grocery-item", { item_name, store_name });
      if (response.data.success) {
        setGroceries(prevGroceryList =>
          prevGroceryList.filter(store => {
            store.items = store.items.filter(item => item.item_name !== item_name);
            return store.items.length > 0;
          })
        );
      }
    } catch (err) {
      console.error(err);
    }
  };
    

  return (
    <> 
    {!isLoggedIn && <div>Please log in to view the listings</div>}
    {isLoggedIn && (
      

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
            {groceries.length === 0 ? <div>Your grocery list is empty</div> : null}
              {groceries.map((store) => {
                return (
                  
                  <div key={`store-${store.store_id}`}>
                    <ListSubheader>{store.store_name}</ListSubheader>
                    {store.items.map((item) => {
                      return (
                        <ListItem key={`item-${item.item_name}`}>
                          <ListItemText className="item-name" primary={item.item_name} />
                          <ListItemText primary={`$${item.item_price}`} />
                          <IconButton
                            aria-label="delete"
                            onClick={() => handleDeleteGroceryItem(item.item_name, store.store_name)}
                          >
                            <RemoveCircleOutlineIcon />
                          </IconButton>

                        </ListItem>
                      );
                    })}
                  </div>
                );
              })}
            </List>
          </Grid>
        </div>
      </div>
      {selectedStore && (
        <div className="drawer">
          <Card sx={{ maxWidth: 345 }}>
            <CardActionArea>
              <CardMedia
                component="img"
                height="140"
                image={selectedStore.store_logo || "/static/..."}
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="h2">
                  {selectedStore.store_name}
                </Typography>
                <Typography variant="body2" color="textSecondary" component="p">
                  {selectedStore.items.map((item) => {
                    return (
                      <div key={`selected-item-${item.item_name}`}>
                        <Typography variant="body2" color="textSecondary" component="p">
                          {item.item_name}: {item.item_price}$
                        </Typography>
                      </div>
                    );
                  })}
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card>
        </div>
      )}
    </div>
    )}
    </>
  );
}
export default Listings;
