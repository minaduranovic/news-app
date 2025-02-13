import React, { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Button,
  IconButton,
} from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { backendApi } from "../services/axios";

function NewsCard({ title, description, imageUrl, url }) {
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    const favoriteArticles =
      JSON.parse(localStorage.getItem("favorites")) || [];
    const isAlreadyFavorite = favoriteArticles.some(
      (article) => article.title === title && article.url === url
    );
    setIsFavorite(isAlreadyFavorite);
  }, [title, url]);

  const handleFavoriteToggle = () => {
    setIsFavorite(!isFavorite);

    const favoriteArticle = { title, description, imageUrl, url };

    if (!isFavorite) {
      const favoriteArticles =
        JSON.parse(localStorage.getItem("favorites")) || [];
      favoriteArticles.push(favoriteArticle);
      localStorage.setItem("favorites", JSON.stringify(favoriteArticles));

      backendApi
        .post("favorites", favoriteArticle)
        .then((response) => console.log("Saved to favorites:", response.data))
        .catch((error) => console.error("Error saving favorite:", error));
    } else {
      let favoriteArticles =
        JSON.parse(localStorage.getItem("favorites")) || [];
      favoriteArticles = favoriteArticles.filter(
        (article) => article.title !== title || article.url !== url
      );
      localStorage.setItem("favorites", JSON.stringify(favoriteArticles));

      backendApi
        .delete("favorites", { data: favoriteArticle })
        .then((response) =>
          console.log("Removed from favorites:", response.data)
        )
        .catch((error) => console.error("Error removing favorite:", error));
    }
  };

  return (
    <Card sx={{ maxWidth: 345, position: "relative" }}>
      <CardMedia component="img" height="140" image={imageUrl} alt={title} />
      <CardContent>
        <Typography gutterBottom variant="h5">
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
        onClick={handleFavoriteToggle}
        color={isFavorite ? "error" : "default"}
        sx={{ position: "absolute", top: 8, right: 8 }}
      >
        {isFavorite ? <FavoriteIcon /> : <FavoriteBorderIcon />}
      </IconButton>
    </Card>
  );
}

export default NewsCard;
