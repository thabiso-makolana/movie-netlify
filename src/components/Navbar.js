import React, { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useTheme } from '../util/ThemeContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faBell } from '@fortawesome/free-solid-svg-icons';
import { searchMovies } from '../util/api';
import '../styles/Navbar.css';

function Navbar() {
  const { theme } = useTheme();
  const [isSearchActive, setIsSearchActive] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const searchRef = useRef(null);
  const overlayRef = useRef(null);
  const navigate = useNavigate();

  const handleSearchFocus = () => {
    setIsSearchActive(true);
  };

  const handleClickOutside = (event) => {
    if (overlayRef.current && !overlayRef.current.contains(event.target) && !searchRef.current.contains(event.target)) {
      setIsSearchActive(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleOptionClick = (route) => {
    navigate(route);
    setIsSearchActive(false);
  };

  const handleSearchChange = async (event) => {
    const query = event.target.value;
    setSearchQuery(query);
    if (query.length > 2) {
      try {
        const results = await searchMovies(query);
        setSearchResults(results.results || []);
      } catch (error) {
        console.error('Error searching movies:', error);
      }
    } else {
      setSearchResults([]);
    }
    setSelectedIndex(-1);
  };

  const handleKeyDown = (event) => {
    if (event.key === 'ArrowDown') {
      setSelectedIndex((prevIndex) => Math.min(prevIndex + 1, searchResults.length - 1));
    } else if (event.key === 'ArrowUp') {
      setSelectedIndex((prevIndex) => Math.max(prevIndex - 1, 0));
    } else if (event.key === 'Enter' && selectedIndex >= 0) {
      handleOptionClick(`/movie/${searchResults[selectedIndex].id}`);
    }
  };

  return (
    <>
      <nav className={`navbar ${theme}`}>
        <div className="navbar-search" ref={searchRef}>
          <div className="search-wrapper">
            <input
              type="text"
              placeholder="Search for a film, a show, an actor..."
              value={searchQuery}
              onChange={handleSearchChange}
              onFocus={handleSearchFocus}
              onKeyDown={handleKeyDown}
            />
            <FontAwesomeIcon icon={faSearch} className="search-icon" />
          </div>
        </div>
      </nav>
      {isSearchActive && (
        <div className={`search-overlay ${theme}`} ref={overlayRef} onClick={handleClickOutside}>
          <div className="search-categories" onClick={(e) => e.stopPropagation()}>
            {searchQuery.length > 2 ? (
              <div className="category">
                <h2>Search Results</h2>
                <ul>
                  {searchResults.map((movie, index) => (
                    <li
                      key={movie.id}
                      className={index === selectedIndex ? 'selected' : ''}
                      onClick={() => handleOptionClick(`/movie/${movie.id}`)}
                    >
                      {movie.title}
                    </li>
                  ))}
                  {searchResults.length === 0 && <li>No results found</li>}
                </ul>
              </div>
            ) : (
              <>
                <div className="category">
                  <h2>Genres</h2>
                  <ul>
                    {['Drama', 'Comedy', 'Action', 'Family evening', 'Documentary', 'Horror', 'Romantic', 'Anime', 'Fantasy', 'International', 'For children', 'Clips and concerts', 'Mystic', 'Thrillers'].map((genre) => (
                      <li key={genre} onClick={() => handleOptionClick(`/movies?genre=${genre}`)}>
                        {genre}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="category">
                  <h2>Movies</h2>
                  <ul>
                    <li onClick={() => handleOptionClick('/movies/original')}>Original TV shows and films</li>
                    <li onClick={() => handleOptionClick('/movies/adventure')}>Adventure TV Shows</li>
                    <li onClick={() => handleOptionClick('/movies/european')}>European</li>
                    <li onClick={() => handleOptionClick('/movies/nordic-and-vikings')}>Nordic and vikings</li>
                    <li onClick={() => handleOptionClick('/movies/superheroes')}>Superheroes</li>
                  </ul>
                </div>
                <div className="category">
                  <h2>Actors</h2>
                  <ul>
                    <li onClick={() => handleOptionClick('/actors')}>Popular Actors</li>
                    <li onClick={() => handleOptionClick('/actors')}>Newcomers</li>
                    <li onClick={() => handleOptionClick('/actors')}>Top Rated</li>
                    <li onClick={() => handleOptionClick('/actors')}>Trending</li>
                  </ul>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
}

export default Navbar;
