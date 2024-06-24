import React from 'react'

function MovieTile({movie,genre}) {
  return (
    <div className='container'>
        <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title} />
        <h4 className='genre'>{genre}</h4>
        <h3 className='title'>{movie.title}</h3>
        <p className='description'>{movie.overview}</p>
    </div>
  )
}

export default MovieTile