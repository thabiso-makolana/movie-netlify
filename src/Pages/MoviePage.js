import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getMovieDetails } from '../util/api';
import './MoviePage.css';
import rottenTomatoesImage from '../images/rotten.png';
import pgImage from '../images/pg.png';
import pg13Image from '../images/pg13.png';
import rating16Image from '../images/pg16.jpg';
import rating18Image from '../images/pg18.jpg';

function MoviePage() {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [logo, setLogo] = useState(null);
  const [isVideo, setIsVideo] = useState(false);
  const [videoUrl, setVideoUrl] = useState(null);
  const [playUrl, setPlayUrl] = useState(null);
  const [showToast, setShowToast] = useState(false);

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        const data = await getMovieDetails(id);
        setMovie(data);

        const logoImage = data.images.logos.find((image) => image.iso_639_1 === 'en' || image.iso_639_1 === null);
        setLogo(logoImage ? `https://image.tmdb.org/t/p/original${logoImage.file_path}` : null);

        const videoClip = data.videos.results.find((video) => video.type === 'Clip' && video.site === 'YouTube');
        setVideoUrl(videoClip ? `https://www.youtube.com/embed/${videoClip.key}?autoplay=1&mute=1&loop=1&controls=0&modestbranding=1&showinfo=0&rel=0&iv_load_policy=3&playlist=${videoClip.key}` : null);

        const trailer = data.videos.results.find((video) => video.type === 'Trailer' && video.site === 'YouTube');
        setPlayUrl(data.homepage || (trailer ? `https://www.youtube.com/watch?v=${trailer.key}` : null));
      } catch (error) {
        console.error('Error fetching movie details:', error);
      }
    };

    fetchMovieDetails();
  }, [id]);

  useEffect(() => {
    const switchToBackdrop = () => {
      setIsVideo(false);
      setTimeout(() => {
        setIsVideo(true);
      }, 20000);
    };

    switchToBackdrop();
    const interval = setInterval(switchToBackdrop, 140000);

    return () => clearInterval(interval);
  }, []);

  const addToFavorites = () => {
    const favorites = JSON.parse(localStorage.getItem('favorites')) || [];
    if (!favorites.find((fav) => fav.id === movie.id)) {
      favorites.push(movie);
      localStorage.setItem('favorites', JSON.stringify(favorites));
      setShowToast(true);
      setTimeout(() => setShowToast(false), 3000);
    }
  };

  const scrollToDetails = () => {
    document.getElementById('movie-details-section').scrollIntoView({ behavior: 'smooth' });
  };

  const getAudienceRatingImage = (rating) => {
    switch (rating) {
      case 'PG':
        return pgImage;
      case 'PG-13':
        return pg13Image;
      case '16':
        return rating16Image;
      case '18+':
        return rating18Image;
      default:
        return null;
    }
  };

  if (!movie) {
    return <div>Loading...</div>;
  }

  const director = movie.credits?.crew?.find((crew) => crew.job === 'Director')?.name || 'Unknown';
  const genreNames = movie.genres.map((genre) => genre.name).join(', ');
  const audienceRating = movie?.certification || 'PG';  // Dynamically fetch audience rating

  return (
    <div className="movie-page">
      <div className="hero-section">
        {isVideo && videoUrl ? (
          <iframe
            className="hero-video"
            src={videoUrl}
            title="Movie Video Clip"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        ) : (
          <div
            className="hero-image"
            style={{ backgroundImage: `url(https://image.tmdb.org/t/p/original${movie.backdrop_path})` }}
          />
        )}
        {logo && (
          <div className="movie-logo">
            <img src={logo} alt={`${movie.title} logo`} />
          </div>
        )}
        <div className="movie-overlay">
          <div className="hero-content">
            <div className="left-section">
              {playUrl && (
                <a href={playUrl} target="_blank" rel="noopener noreferrer">
                  <button className="play-button">► Play</button>
                </a>
              )}
              <button className="add-button" onClick={addToFavorites}>+ Add to Favorites</button>
            </div>
            <div className="middle-section" onClick={scrollToDetails}>
              <p className="movie-description">{movie.overview}</p>
              <p className="movie-details">
                {genreNames} • {movie.runtime} min • {movie.release_date.split('-')[0]} •
                <img src={rottenTomatoesImage} alt="Rotten Tomatoes" className="rating-image" /> {Math.round(movie.vote_average * 10)}%
                {audienceRating && (
                  <img src={getAudienceRatingImage(audienceRating)} alt={audienceRating} className="rating-image negative-filter" />
                )}
              </p>
            </div>
            <div className="right-section">
              <p><strong>Starring:</strong> {movie.credits?.cast?.slice(0, 3).map((actor) => (
                <span key={actor.id}>
                  <Link to={`/actor/${actor.id}`} className="cast-link">{actor.name}</Link>{', '}
                </span>
              ))}
                <strong>Director:</strong> {director}</p>
            </div>
          </div>
        </div>
      </div>
      {showToast && <div className="toast">Movie added to favorites!</div>}
      <div className="cast-section">
        <h2>Cast & Crew</h2>
        <div className="cast-list">
          {movie.credits?.cast?.slice(0, 9).map((actor) => (
            <div key={actor.id} className="cast-item">
              <Link to={`/actor/${actor.id}`} className='cast-link'>
                <img src={`https://image.tmdb.org/t/p/w200${actor.profile_path}`} alt={actor.name} />
                <p>{actor.name}</p>
              </Link>
            </div>
          ))}
        </div>
      </div>
      <hr />
      <div id="movie-details-section" className="movie-details-section">
        <h2>About</h2>
        <div className="details-overview">
          <div className="detail-box">
            <h3>{movie.title}</h3>
            <h4>{genreNames}</h4>
            <p>{movie.overview}</p>
          </div>
          <div className="detail-box">
            <img src={getAudienceRatingImage(audienceRating)} alt={audienceRating} />
            <p>Some material may not be suitable for children. Rated PG-13: Parents strongly cautioned – Some material may be inappropriate for children under 13. Rated R: Restricted – Under 17 requires accompanying parent or adult guardian. Rated X: No one under 17 admitted</p>
          </div>
          <div className="detail-box">
            <div className='rotten'>
              <img src={rottenTomatoesImage} alt="Rotten Tomatoes" />
              <p>{Math.round(movie.vote_average * 10)}%</p>
            </div>
            <h4>Tomatometer</h4>
          </div>
        </div>
        <hr />
        <div className="more-info">
          <div className="info-section">
            <h3>Information</h3>
            <p><strong>Studio:</strong> {movie.production_companies.map((company) => company.name).join(', ')}</p>
            <p><strong>Released:</strong> {movie.release_date.split('-')[0]}</p>
            <p><strong>Run Time:</strong> {movie.runtime} min</p>
            <p><strong>Rated:</strong> {movie.certification}</p>
            <p><strong>Region of Origin:</strong> {movie.production_countries.map((country) => country.name).join(', ')}</p>
          </div>
          <div className="info-section">
            <h3>Languages</h3>
            <p><strong>Original Audio:</strong> {movie.spoken_languages.map((language) => language.english_name).join(', ')}</p>
            <p><strong>Audio:</strong> {movie.spoken_languages.map((language) => language.english_name).join(', ')}</p>
            <p><strong>Subtitles:</strong> {movie.spoken_languages.map((language) => language.english_name).join(', ')}</p>
          </div>
          <div className="info-section">
            <h3>Accessibility</h3>
            <p>Closed captions (CC) refer to subtitles in the available language with the addition of relevant non-dialogue information.</p>
            <p>Audio descriptions (AD) refer to a narration track describing what is happening on screen</p></div>
        </div>
      </div>
    </div>
  );
}

export default MoviePage;
