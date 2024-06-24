import React, { useState, useEffect } from 'react';
import { getTopRatedTVShows, getTopRatedMovies } from '../util/api';
import { Link } from 'react-router-dom';
import { useTheme } from '../util/ThemeContext';
import './HomePage.css';

function HomePage() {
  const [tvShows, setTVShows] = useState([]);
  const [movies, setMovies] = useState([]);
  const { theme } = useTheme();

  useEffect(() => {
    const fetchTopRatedTVShows = async () => {
      try {
        const data = await getTopRatedTVShows();
        setTVShows(data.results);
      } catch (error) {
        console.error('Error fetching top rated TV shows:', error);
      }
    };

    const fetchTopRatedMovies = async () => {
      try {
        const data = await getTopRatedMovies();
        setMovies(data.results);
      } catch (error) {
        console.error('Error fetching top rated movies:', error);
      }
    };

    fetchTopRatedTVShows();
    fetchTopRatedMovies();
  }, []);

  return (
    <div className={`movies-page ${theme}`}>
      <div className="movies-list">
        {movies.map((movie) => (
          <Link key={movie.id} to={`/movie/${movie.id}`} className="movie-item-link">
            <div className="movie-item">
              <img src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`} alt={movie.title} />
              <p>{movie.title}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default HomePage;
