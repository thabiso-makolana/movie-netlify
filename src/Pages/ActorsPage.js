import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getPopularActors } from '../util/api';
import './ActorsPage.css';

function ActorsPage() {
  const [actors, setActors] = useState([]);

  useEffect(() => {
    const fetchActors = async () => {
      try {
        const data = await getPopularActors();
        setActors(data.results || []);
      } catch (error) {
        console.error('Error fetching popular actors:', error);
      }
    };

    fetchActors();
  }, []);

  if (!actors.length) {
    return <div>Loading...</div>;
  }

  return (
    <div className="actors-page">
      <h1>Popular Actors</h1>
      <div className="actors-list">
        {actors.map(actor => (
          <div key={actor.id} className="actor-item">
            <Link to={`/actor/${actor.id}`}>
              <img src={`https://image.tmdb.org/t/p/w200${actor.profile_path}`} alt={actor.name} />
              <h2>{actor.name}</h2>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ActorsPage;
