import React, { useEffect, useState } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { getMoviesByGenre } from '../util/api';
import { useTheme } from '../util/ThemeContext';
import './MoviesPage.css';

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

function MoviesPage() {
  const query = useQuery();
  const genre = query.get('genre') || 'Action';
  const [movies, setMovies] = useState([]);
  const { theme } = useTheme();

  useEffect(() => {
    const fetchMovies = async () => {
      const data = await getMoviesByGenre(genre);
      setMovies(data.results);
    };

    fetchMovies();
  }, [genre]);

  return (
    <div className={`movies-page ${theme}`}>
      <h1>{genre} Movies</h1>
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

export default MoviesPage;
