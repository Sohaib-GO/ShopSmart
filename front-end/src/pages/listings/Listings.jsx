import React, { useState, useEffect } from "react";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import FormGroup from "@mui/material/FormGroup";
import { Alert, Divider, Modal } from "@mui/material";
import ListItemButton from "@mui/material/ListItemButton";
import Checkbox from "@mui/material/Checkbox";
import "./Listings.css";
import DeleteIcon from "@mui/icons-material/Delete";
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
import { Button, Drawer, CardActionArea, CardActions } from "@mui/material";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import { ListSubheader } from "@mui/material";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import axios from "axios";
import Map from "../map/Map";
import DistanceTime from "../map/CalculateDis";

import useLogin from "../../components/authentication/useLogin";
import { useGroceryList } from "./useListingsHook";

const label = { inputProps: { "aria-label": "Switch demo" } };

const modalStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  pt: 2,
  px: 4,
  pb: 3,
};

function Listings(props) {
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [dense, setDense] = useState(false);
  const [selectedStore, setSelectedStore] = useState(null);
  const [groceries, setGroceries] = useState([]);
  const [checkedItems, setCheckedItems] = useState([]);

  const [isListsOpen, setListsOpen] = useState({
    1: false,
    2: false,
    3: false,
    4: false,
    5: false,
  });

  const { isLoggedIn } = useLogin(props);

  useEffect(() => {
    fetch("/api/lists/fetch-grocery-list")
      .then((res) => res.json())
      .then((data) => setGroceries(data.data));
  }, []);

  useEffect(() => {
    console.log(selectedStore, " store");
  }, [selectedStore]);

  const handleDeleteGroceryItem = async (item_name, store_name) => {
    try {
      const response = await axios.post("/api/lists/delete-grocery-item", {
        item_name,
        store_name,
      });
      if (response.data.success) {
        setGroceries((prevGroceryList) =>
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

  const handleOpenDeleteModal = (name, store) => {
    setCheckedItems((prev) => [...prev, { name: name, store: store }]);
    setOpenDeleteModal(true);
  };
  const handleCloseDeleteModal = () => {
    setOpenDeleteModal(false);
  };
  const handleDeleteModalSubmit = () => {
    checkedItems.forEach((item) =>
      handleDeleteGroceryItem(item.name, item.store)
    );
    setOpenDeleteModal(false);
  };

  const handleCheckItem = (name, store) => () => {
    const checked = isChecked(name, store);
    if (checked) {
      const filteredItems = checkedItems.filter(
        (item) => item.name !== name && item.store !== store
      );
      setCheckedItems(filteredItems);
    } else {
      setCheckedItems((prev) => [...prev, { name: name, store: store }]);
    }
  };

  const isChecked = (name, store) => {
    for (const item of checkedItems) {
      if (item.name === name && item.store === store) return true;
    }
    return false;
  };

  const handleAccordion = (store) => {
    setListsOpen = { store: true };
  };

  useEffect(() => {
    const dropdown = document.getElementById(selectedStore);
    if (dropdown) {
      dropdown.click();
    }
  }, [selectedStore]);

  return (
    <>
      {!isLoggedIn && <Alert severity="warning">Please sign in</Alert>}
      {isLoggedIn && (
        <div className="listings-page">
          <div>
            {groceries?.map((store) => {
              //isListsOpen add store to this list, set the value to false or true depending if you want the default state to be open or not
              return (
                <Accordion className="accordion">
                  <AccordionSummary
                    sx={{ width: "740px", backgroundColor: "lightgrey" }}
                    expandIcon={<ExpandMoreIcon />}
                  >
                    <div className="accordion-header">
                      <img
                        src={store.store_image}
                        alt="store logo"
                        style={{
                          width: "40%",
                          height: "auto",
                          objectFit: "cover",
                        }}
                      />
                      <Typography color="grey" variant="body2">
                        You saved {store.items.length}{" "}
                        {store.items.length === 1 ? "item" : "items"} in this
                        store
                      </Typography>
                    </div>
                  </AccordionSummary>
                  <AccordionDetails className="store-details">
                    <div>
                      {store.items.map((item) => {
                        const checked = isChecked(
                          item.item_name,
                          store.store_name
                        );
                        return (
                          <List
                            dense
                            sx={{ width: "100%", maxWidth: 500, minWidth: 400 }}
                          >
                            <ListItem
                              key={`id-${item.item_name}`}
                              className="list-item"
                              secondaryAction={
                                <div className="list-item-action-buttons">
                                  {/* <Checkbox
                                  checked={checked}
                                  edge="end"
                                  color="success"
                                  onChange={() =>
                                    handleCheckItem(
                                      item.item_name,
                                      store.store_name
                                    )
                                  }
                                /> */}
                                  <IconButton
                                    edge="end"
                                    aria-label="delete"
                                    onClick={() =>
                                      handleOpenDeleteModal(
                                        item.item_name,
                                        store.store_name
                                      )
                                    }
                                  >
                                    <DeleteIcon />
                                  </IconButton>
                                </div>
                              }
                              disablePadding
                            >
                              <ListItemButton>
                                <ListItemAvatar>
                                  <Avatar
                                    alt={`Avatar${item.item_image}`}
                                    src={item.item_image}
                                  />
                                </ListItemAvatar>
                                <ListItemText
                                  className="list-item-text"
                                  primary={item.item_name}
                                />
                                <ListItemText
                                  id={item.id}
                                  primary={` $${item.item_price}`}
                                />
                              </ListItemButton>
                            </ListItem>
                            <Divider variant="inset" component="li" />

                            <Modal
                              hideBackdrop
                              open={openDeleteModal}
                              onClose={handleCloseDeleteModal}
                            >
                              <Box sx={{ ...modalStyle }}>
                                <Typography variant="h6" color="text.secondary">
                                  Are you sure you want to delete this item?
                                </Typography>
                                <Typography
                                  variant="body1"
                                  color="text.secondary"
                                >
                                  This item will be removed from your list
                                  permanently
                                </Typography>
                                <div className="modal-action-buttons">
                                  <Button
                                    variant="outlined"
                                    color="error"
                                    onClick={handleDeleteModalSubmit}
                                  >
                                    Yes
                                  </Button>
                                  <Button
                                    variant="outlined"
                                    onClick={handleCloseDeleteModal}
                                  >
                                    No
                                  </Button>
                                </div>
                              </Box>
                            </Modal>
                          </List>
                        );
                      })}
                      <DistanceTime store={store} />
                    </div>
                  </AccordionDetails>
                </Accordion>
              );
            })}
          </div>
          <Map groceries={groceries} />
        </div>
      )}
    </>
  );
}
export default Listings;
