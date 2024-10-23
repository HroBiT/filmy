import React, { useState } from 'react';
import axios from 'axios';
import Card from './components/Card/Card';
import SearchBar from './components/SearchBar/SearchBar';

function App() {
  const [movies, setMovies] = useState([]);

  const handleSearch = (query) => {
    axios({
      method: 'get',
      url: `https://www.omdbapi.com/?s=${query}&apikey=fb777bca`
    }).then(response => {
      if (response.data.Search) {
        setMovies(response.data.Search);
      } else {
        setMovies([]);
      }
    }).catch(error => {
      console.error("cos nie tak", error);
    });
  };

  return (
    <div className="bg-gray-100 min-h-screen flex flex-col items-center justify-center p-4">
      <SearchBar onSearch={handleSearch} />
      <div className="w-full max-w-6xl grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mt-6 transition-all duration-300">
        {movies.map((movie) => (
          <Card key={movie.imdbID} movie={movie} />
        ))}
      </div>
    </div>
  );
}

export default App;
