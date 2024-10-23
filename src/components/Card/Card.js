import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../../App.css';

function Card({ movie }) {
  const [movieData, setMovieData] = useState(null);

  useEffect(() => {
    axios({
      method: 'get',
      url: `https://www.omdbapi.com/?i=${movie.imdbID}&apikey=fb777bca`
    }).then(response => {
      setMovieData(response.data);
    }).catch(error => {
      console.error("cos nie tak", error);
    });
  }, [movie.imdbID]);

  return (
    <div className="bg-surface p-6 rounded-4xl shadow-lg">
      {movieData ? (
        <div className="text-center">
          <img src={movieData.Poster} alt={movieData.Title} className="w-1/2 mx-auto mb-4 rounded-lg" />
          <h1 className="text-4xl font-bold mb-2 text-primary">{movieData.Title}</h1>
          <p className="text-xl mb-2 text-secondary">{movieData.Year}</p>
          <p className="text-lg mb-2 text-accent">{movieData.Genre}</p>
          <p className="text-base text-secondary">{movieData.Plot}</p>
        </div>
      ) : (
        <p className="text-xl text-primary">Loading...</p>
      )}
    </div>
  );
}

export default Card;