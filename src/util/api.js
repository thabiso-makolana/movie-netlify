import axios from 'axios';

const API_KEY = '9cb2b6bbc28953db385ce23b30487bf6';
const BASE_URL = 'https://api.themoviedb.org/3';

const apiClient = axios.create({
  baseURL: BASE_URL,
  params: {
    api_key: API_KEY,
  },
});

export const getLatestMovies = async () => {
  try {
    const response = await apiClient.get('/movie/now_playing?language=en-US&page=1');
    return response.data.results;
  } catch (error) {
    console.error('Error fetching the latest movies:', error);
    throw error;
  }
};

export const getMovieDetails = async (movieId) => {
  try {
    const response = await apiClient.get(`/movie/${movieId}`, {
      params: {
        append_to_response: 'credits,similar,videos,images',
        include_image_language: 'en,null'
      }
    });
    return response.data;
  } catch (error) {
    console.error(`Error fetching details for movie ID ${movieId}:`, error);
    throw error;
  }
};

export const getPopularActors = async () => {
  try {
    const response = await apiClient.get('/person/popular');
    return response.data;
  } catch (error) {
    console.error('Error fetching popular actors:', error);
    throw error;
  }
};

export const getActorDetails = async (actorId) => {
  try {
    const response = await apiClient.get(`/person/${actorId}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching details for actor ID ${actorId}:`, error);
    throw error;
  }
};

// export const searchMovies = async (query) => {
//   try {
//     const response = await apiClient.get('/search/movie', {
//       params: {
//         query: query,
//       },
//     });
//     return response.data;
//   } catch (error) {
//     console.error(`Error searching for movies with query "${query}":`, error);
//     throw error;
//   }
// };
export const searchMovies = async (query) => {
  const response = await fetch(`https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${query}`);
  const data = await response.json();
  return data;
};

export const getTopRatedTVShows = async () => {
  const response = await fetch(`https://api.themoviedb.org/3/tv/top_rated?api_key=${API_KEY}`);
  const data = await response.json();
  return data;
};

export const getTopRatedMovies = async () => {
  const response = await fetch(`https://api.themoviedb.org/3/movie/top_rated?api_key=${API_KEY}`);
  const data = await response.json();
  return data;
};

export const getGenres = async () => {
  const response = await fetch(`${BASE_URL}/genre/movie/list?api_key=${API_KEY}`);
  const data = await response.json();
  return data.genres;
};


export const getMoviesByGenre = async (genre) => {
  const genreMapping = {
    Action: 28,
    Drama: 18,
    Comedy: 35,
  };

  const genreId = genreMapping[genre] || genreMapping['Action'];

  const response = await axios.get(`https://api.themoviedb.org/3/discover/movie`, {
    params: {
      api_key: API_KEY,
      with_genres: genreId,
    },
  });
  return response.data;
};