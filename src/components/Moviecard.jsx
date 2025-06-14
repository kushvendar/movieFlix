import React from 'react'

'1:34'

const Moviecard = ({movie:{title, backdrop_path, release_date, poster_path, overview, vote_average, original_language }}) => {
  return (
    <div className='movie-card'>
      <img src={poster_path? `https://image.tmdb.org/t/p/w500/${poster_path}`:'/no-movie.png'} alt={title} />
      <div className='mt-4'>
        <h3>{title}</h3>
        <div className='content'>
            <div className='rating'>
                <img src="star.svg" alt="star icon" />
                <p>{vote_average?vote_average.toFixed(1):'N/A'}</p>
            </div>
            <span>&#9679;</span>
            <p className='lang'>{original_language}</p>
            <span className='year'>{release_date?release_date.split('-')[0]:'N/A'}</span>
        </div>
      </div>

    </div>
  )
}

export default Moviecard
