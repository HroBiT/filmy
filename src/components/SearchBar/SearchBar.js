import React, { useState } from 'react';

function SearchBar({ onSearch }) {
  const [query, setQuery] = useState('');

  const handleSearch = (e) => {
    e.preventDefault();
    onSearch(query);
  };

  return (
    <form onSubmit={handleSearch} className="mb-4">
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Filmy"
        className="p-2 border rounded"
      />
      <button type="submit" className="p-2 ml-2 bg-primary text-white rounded">
        Search
      </button>
    </form>
  );
}

export default SearchBar;