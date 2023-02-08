import React, { useState } from "react";
import "./SavedItems.css";
import { Button, CardActionArea, CardActions, Modal, Box } from "@mui/material";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";

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

function SavedItems({ savedItems, setSavedItems }) {
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  function removeItems(item) {
    const items = savedItems;
    const filterItems = items.filter(function (el) {
      return el.id !== item.id;
    });
    setSavedItems(filterItems);
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

  return (
    <div className="saved-items-page">
      {savedItems.map((item) => {
        return (
          <>
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
                  onClick={handleOpenDeleteModal}
                  size="small"
                  color="warning"
                >
                  Delete
                </Button>
              </CardActions>
            </Card>
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
          </>
        );
      })}
    </div>
  );
}

export default SavedItems;
