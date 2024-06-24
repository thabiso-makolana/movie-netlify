import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import HomePage from './Pages/HomePage';
import MoviesPage from './Pages/MoviesPage';
import ActorsPage from './Pages/ActorsPage';
import ActorDetailsPage from './Pages/ActorDetailsPage';
import FavoritesPage from './Pages/FavoritesPage';
import MoviePage from './Pages/MoviePage';
import Sidebar from './components/Sidebar';
import './App.css';
import { ThemeProvider, useTheme } from './util/ThemeContext';

const AppContent = () => {
  const { theme } = useTheme();

  useEffect(() => {
    document.body.className = theme;
  }, [theme]);

  return (
    <div className={`App ${theme}`}>
      <Navbar />
      <Sidebar />
      <div className="main-content">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/movies" element={<MoviesPage />} />
          <Route path="/actors" element={<ActorsPage />} />
          <Route path="/actor/:actorid" element={<ActorDetailsPage />} />
          <Route path="/movie/:id" element={<MoviePage />} />
          <Route path="/favorites" element={<FavoritesPage/>} />
        </Routes>
      </div>
      <Footer />
    </div>
  );
};

function App() {
  return (
    <ThemeProvider>
      <Router>
        <AppContent />
      </Router>
    </ThemeProvider>
  );
}

export default App;
