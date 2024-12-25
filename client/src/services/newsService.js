import { newsApi } from './axios';

const fetchTopHeadlines = async (country = 'us') => {
  try {
    const response = await newsApi.get(`top-headlines?country=${country}`);
    return response.data.articles;
  } catch (error) {
    console.error("Error fetching top headlines:", error);
    throw error;
  }
};

export {
  fetchTopHeadlines 
}