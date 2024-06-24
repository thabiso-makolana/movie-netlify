import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getActorDetails } from '../util/api';
import './ActorDetail.css';

function ActorDetailsPage() {
  const { actorid } = useParams();
  const [actor, setActor] = useState(null);

  useEffect(() => {
    const fetchActorDetails = async () => {
      try {
        const data = await getActorDetails(actorid);
        setActor(data);
      } catch (error) {
        console.error(`Error fetching details for actor ID ${actorid}:`, error);
      }
    };

    fetchActorDetails();
  }, [actorid]);

  if (!actor) {
    return <div>Loading...</div>;
  }

  return (
    <div className="actor-detail">
      <h1>{actor.name}</h1>
      <img src={`https://image.tmdb.org/t/p/w500${actor.profile_path}`} alt={actor.name} />
      <p>{actor.biography}</p>
      <p>Born: {actor.birthday}</p>
      <p>Place of Birth: {actor.place_of_birth}</p>
      <p>Known for: {actor.known_for_department}</p>
    </div>
  );
}

export default ActorDetailsPage;
