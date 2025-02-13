import React, { useEffect, useState } from "react";
import { fetchCategoryHeadlines } from "../services/newsService";
import { Container, Typography, Box } from "@mui/material";
import NewsCard from "../components/NewsCard";

function CategoryPage({ category }) {
  const [news, setNews] = useState([]);
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const loadCategoryNews = async () => {
      try {
        const articles = await fetchCategoryHeadlines(category);
        setNews(articles);
      } catch (error) {
        console.error(`Error loading news for category "${category}":`, error);
      }
    };

    if (category) {
      loadCategoryNews();
    }
  }, [category]);


  const validNews = news.filter(
    (article) => article.title && article.urlToImage && article.description
  );

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        {category} News
      </Typography>
      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          gap: 2,
          justifyContent: "space-between",
        }}
      >
        {validNews.map((article, index) => (
          <NewsCard
            key={index}
            title={article.title}
            description={article.description}
            imageUrl={article.urlToImage}
            url={article.url}
            onFavoriteToggle={() => toggleFavorite(article)}
            isFavorite={favorites.some((fav) => fav.title === article.title)}
          />
        ))}
      </Box>
    </Container>
  );
}

export default CategoryPage;
