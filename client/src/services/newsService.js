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

const fetchCategoryHeadlines = async (category, country = "us") => {
  try {
    if (!category) {
      throw new Error("Category is required to fetch category headlines.");
    }

    const response = await newsApi.get("top-headlines", {
      params: { country, category },
    });

    return response.data.articles;
  } catch (error) {
    console.error(`Error fetching headlines for category "${category}":`, error);
    throw error;
  }
}
export {
  fetchTopHeadlines,
  fetchCategoryHeadlines
}