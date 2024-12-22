import axios from 'axios';

const newsApi = axios.create({
  baseURL: 'https://newsapi.org/v2/',
  headers: {
    'Authorization': `Bearer ${import.meta.env.VITE_NEWS_API_KEY}`,
  }
});

const jsonServer = axios.create({
  baseURL: 'http://localhost:3000/',
});

export { newsApi, jsonServer };
