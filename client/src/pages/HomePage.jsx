import React, { useEffect, useState } from "react";
import { fetchTopHeadlines } from "../services/newsService";
import { Container, Typography, Box } from "@mui/material";
import NewsCard from "../components/NewsCard";

function HomePage() {
  const [news, setNews] = useState([]);
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const loadNews = async () => {
      try {
        const articles = await fetchTopHeadlines();
        setNews(articles);
      } catch (error) {
        console.error("Error loading news:", error);
      }
    };

    loadNews();
  }, []);


  const validNews = news.filter(
    (article) => article.title && article.urlToImage && article.description
  );

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Top News
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

export default HomePage;
