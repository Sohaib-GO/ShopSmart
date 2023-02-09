import React, { useState } from "react";
import "./Listings.css";
import { Button, Divider, CardActions, Modal, Box } from "@mui/material";
import Typography from "@mui/material/Typography";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Checkbox from "@mui/material/Checkbox";
import IconButton from "@mui/material/IconButton";
import Avatar from "@mui/material/Avatar";
import DeleteIcon from "@mui/icons-material/Delete";

const modalStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 500,
  bgcolor: "background.paper",
  border: "1px solid #000",
  boxShadow: 24,
  pt: 2,
  px: 4,
  pb: 3,
};

function Listings({ listings, setListings }) {
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [checkedItems, setCheckedItems] = useState([]);

  function removeItems(item) {
    const items = listings;
    const filterItems = items.filter(function (el) {
      return el.id !== item.id;
    });
    setListings(filterItems);
  }
  const handleOpenDeleteModal = () => {
    setOpenDeleteModal(true);
  };
  const handleCloseDeleteModal = () => {
    setOpenDeleteModal(false);
  };
  const handleDeleteModalSubmit = (item) => {
    removeItems(item);
    setOpenDeleteModal(false);
  };
  const handleCheckItem = (value) => () => {
    const currentIndex = checkedItems.indexOf(value.id);
    console.log("curee", currentIndex);
    const newChecked = [...checkedItems];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setCheckedItems(newChecked);
  };

  const isChecked = (item) => {
    checkedItems.some((value) => {
      return value.id === item.id;
    });
  };
  return (
    <div className="listings">
      {listings.map((item) => {
        return (
          <List dense sx={{ width: "100%", maxWidth: 400 }}>
            <ListItem
              key={item.id}
              className="list-item"
              secondaryAction={
                <div className="list-item-action-buttons">
                  <Checkbox
                    edge="end"
                    color="success"
                    onChange={(event) => {
                      event.target.checked = true;
                      handleCheckItem(item);
                    }}
                  />
                  <IconButton
                    edge="end"
                    aria-label="delete"
                    onClick={handleOpenDeleteModal}
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
                    alt={`Avatar${item.storeLogo}`}
                    src={item.storeLogo}
                  />
                </ListItemAvatar>
                <ListItemText
                  className="list-item-text"
                  id={item.id}
                  primary={item.name}
                />
                <ListItemText
                  id={item.id}
                  primary={`${item.price}$ per 100 g`}
                />
              </ListItemButton>
            </ListItem>
            <Divider variant="inset" component="li" />

            {/* <Card sx={{ maxWidth: 345 }}>
              <CardMedia
                key={`listings${item.id}`}
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
                  onClick={handleOpenDeleteModal}
                  size="small"
                  color="warning"
                >
                  Delete
                </Button>
              </CardActions>
            </Card> */}
            <Modal
              hideBackdrop
              open={openDeleteModal}
              onClose={handleCloseDeleteModal}
            >
              <Box sx={{ ...modalStyle }}>
                <Typography variant="h6" color="text.secondary">
                  Are you sure you want to delete this item?
                </Typography>
                <Typography variant="body1" color="text.secondary">
                  This item will be removed from your list permanently
                </Typography>
                <div className="modal-action-buttons">
                  <Button
                    variant="outlined"
                    color="error"
                    onClick={() => handleDeleteModalSubmit(item)}
                  >
                    Yes
                  </Button>
                  <Button variant="outlined" onClick={handleCloseDeleteModal}>
                    No
                  </Button>
                </div>
              </Box>
            </Modal>
          </List>
        );
      })}
    </div>
  );
}

export default Listings;
