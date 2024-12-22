import React, { useEffect, useState } from 'react';
import { fetchTopHeadlines } from '../services/newsService';
import { Container, Typography, Box } from '@mui/material';

function HomePage() {
  const [news, setNews] = useState([]);

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


  return (
    <Container>
      <Typography variant="h4" gutterBottom>Top News</Typography>
      <Box
        sx={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: 2,
          justifyContent: 'space-between',
        }}
      >
             </Box>
    </Container>
  );
}

export default HomePage;
