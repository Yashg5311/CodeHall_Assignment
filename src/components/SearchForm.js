import React, { useState } from 'react';
import './SearchForm.css'; 

const SearchForm = ({ onSearch }) => {
  const [query, setQuery] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(query);
  };

  return (
    <form onSubmit={handleSubmit} className="search-form">
      <input
        type="text"
        placeholder="Search for books...."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="search-input" 
      />
      <button type="submit" className="search-button">Go</button> 
    </form>
  );
};

export default SearchForm;
