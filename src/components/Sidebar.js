import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faFilm, faUsers, faHeart, faCog, faMoon, faSun } from '@fortawesome/free-solid-svg-icons';
import { useTheme } from '../util/ThemeContext';
import './Sidebar.css';

function Sidebar() {
  const { theme, toggleTheme } = useTheme();
  const [isExpanded, setIsExpanded] = useState(false);

  const handleMouseEnter = () => setIsExpanded(true);
  const handleMouseLeave = () => setIsExpanded(false);

  const logoSrc = theme === 'light' ? (isExpanded ? '/wtvwhite.png' : '/TVWH.png') : (isExpanded ? '/wtvblack.png' : '/TVBL.png');

  return (
    <>
      <div className={`sidebar ${theme} ${isExpanded ? 'expanded' : ''}`} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
        <div className="navbar-logo">
          <Link to="/">
            <img src={logoSrc} alt="tvbox" className="logo" />
          </Link>
        </div>
        <div className={`sidebar-icon ${theme}`}>
          <Link to="/"><FontAwesomeIcon icon={faHome} /><span className="sidebar-text">Home</span></Link>
        </div>
        <div className={`sidebar-icon ${theme}`}>
          <Link to="/movies"><FontAwesomeIcon icon={faFilm} /><span className="sidebar-text">Movies</span></Link>
        </div>
        <div className={`sidebar-icon ${theme}`}>
          <Link to="/actors"><FontAwesomeIcon icon={faUsers} /><span className="sidebar-text">Actors</span></Link>
        </div>
        <div className={`sidebar-icon ${theme}`}>
          <Link to="/favorites"><FontAwesomeIcon icon={faHeart} /><span className="sidebar-text">Favorites</span></Link>
        </div>
        <div className={`sidebar-icon theme-switcher ${theme}`} onClick={toggleTheme}>
          <FontAwesomeIcon icon={theme === 'light' ? faMoon : faSun} />
          <span className="sidebar-text">{theme === 'light' ? 'Dark Mode' : 'Light Mode'}</span>
        </div>
      </div>
      <div className={`overlay ${isExpanded ? 'show' : ''}`} />
    </>
  );
}

export default Sidebar;
