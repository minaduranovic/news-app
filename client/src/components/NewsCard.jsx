import React, { useState } from "react";
import { Card, CardContent, CardMedia, Typography, Button, IconButton } from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";

function NewsCard({ title, description, imageUrl, url, onFavoriteToggle, isFavorite }) {
  return (
    <Card sx={{ maxWidth: 345, position: "relative" }}>
      <CardMedia
        component="img"
        height="140"
        image={imageUrl} 
        alt={title}
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {description || "No description available."}
        </Typography>
      </CardContent>
      <Button
        size="small"
        color="primary"
        href={url}
        target="_blank"
        rel="noopener noreferrer"
      >
        Read More
      </Button>
      <IconButton
        onClick={onFavoriteToggle}
        color={isFavorite ? "error" : "default"}
        sx={{ position: "absolute", top: 8, right: 8 }}
      >
        {isFavorite ? <FavoriteIcon /> : <FavoriteBorderIcon />}
      </IconButton>
    </Card>
  );
}

export default NewsCard;
