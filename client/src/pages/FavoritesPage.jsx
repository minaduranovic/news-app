import { useEffect, useState } from "react";
import { Grid, Typography } from "@mui/material";
import axios from "axios";
import NewsCard from "../components/NewsCard";

const FavoritesPage = () => {
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchFavorites();
  }, []);

  const fetchFavorites = async () => {
    try {
      const response = await axios.get("http://localhost:5261/api/favorites");
      setFavorites(response.data);
    } catch (err) {
      setError("Failed to load favorites");
    } finally {
      setLoading(false);
    }
  };

  const removeFavorite = async (article) => {
    try {
      setLoading(true);

      await axios.delete("http://localhost:5261/api/favorites", {
        data: article,
      });
      setFavorites((prevFavorites) =>
        prevFavorites.filter((fav) => fav.title !== article.title)
      );
    } catch (err) {
      console.error("Error removing favorite:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <Typography variant="h4" gutterBottom>
        My Favorite Articles
      </Typography>
      {loading && <p>Loading favorites...</p>}
      {error && <p className="text-red-500">{error}</p>}
      {!loading && !error && favorites.length === 0 && (
        <Typography variant="h6" color="textSecondary">
          No favorites found.
        </Typography>
      )}

      <Grid container spacing={3} justifyContent="center">
        {favorites.map((article, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <NewsCard
              title={article.title}
              description={article.description}
              imageUrl={article.imageUrl}
              url={article.url}
              isFavorite={true}
              onFavoriteToggle={() => removeFavorite(article)}
              disableAdding={true}
            />
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default FavoritesPage;
