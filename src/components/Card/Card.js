import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../../App.css';

function Card({ movie }) {
  const [movieData, setMovieData] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

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

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <div 
        className="bg-surface p-6 rounded-4xl shadow-lg cursor-pointer" 
        onClick={openModal}
      >
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

      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
          <div className="bg-white p-8 rounded-lg shadow-lg w-3/4 lg:w-1/2 relative">
            <button 
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-800 text-2xl" 
              onClick={closeModal}
            >
              &times;
            </button>
            {movieData && (
              <div className="text-center">
                <img src={movieData.Poster} alt={movieData.Title} className="w-1/3 mx-auto mb-4 rounded-lg" />
                <h1 className="text-4xl font-bold mb-2 text-primary">{movieData.Title}</h1>
                <p className="text-xl mb-2 text-secondary">{movieData.Year}</p>
                <p className="text-lg mb-2 text-accent">{movieData.Genre}</p>
                <p className="text-base mb-4 text-secondary">{movieData.Plot}</p>

                <div className="text-left">
                  <p><strong>Director:</strong> {movieData.Director}</p>
                  <p><strong>Actors:</strong> {movieData.Actors}</p>
                  <p><strong>Runtime:</strong> {movieData.Runtime}</p>
                  <p><strong>Language:</strong> {movieData.Language}</p>
                  <p><strong>Awards:</strong> {movieData.Awards}</p>
                  <p><strong>IMDb Rating:</strong> {movieData.imdbRating}</p>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}

export default Card;