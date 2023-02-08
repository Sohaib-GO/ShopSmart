import React, { useState } from "react";
import "./SavedItems.css";
import { Button, CardActionArea, CardActions, Modal, Box } from "@mui/material";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";

const style = {
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
        );
      })}
      <Modal
        hideBackdrop
        open={openDeleteModal}
        onClose={handleCloseDeleteModal}
      >
        <Box sx={{ ...style, width: 200 }}>
          <h2 id="child-modal-title">
            Are you sure you want to delete this item?
          </h2>
          <p id="child-modal-description"></p>
          <Button onClick={handleCloseDeleteModal}>Yes</Button>
          <Button onClick={handleCloseDeleteModal}>No</Button>
        </Box>
      </Modal>
    </div>
  );
}

export default SavedItems;
