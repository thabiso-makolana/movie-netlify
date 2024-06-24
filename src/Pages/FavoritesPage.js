import React, { useState, useEffect } from 'react';
import './FavoritesPage.css';

function FavoritesPage() {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const storedFavorites = JSON.parse(localStorage.getItem('favorites')) || [];
    setFavorites(storedFavorites);
  }, []);

  return (
    <div className="favorites-page">
      <h2>Your Favorite Movies</h2>
      <div className="favorites-list">
        {favorites.length > 0 ? (
          favorites.map((movie) => (
            <div key={movie.id} className="favorite-item">
              <img src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`} alt={movie.title} />
              <p>{movie.title}</p>
            </div>
          ))
        ) : (
          <p className="no-favorites-message">You have no favorite movies yet. Start adding some!</p>
        )}
      </div>
    </div>
  );
}

export default FavoritesPage;
