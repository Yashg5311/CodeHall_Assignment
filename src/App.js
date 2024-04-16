import React, { useState, useEffect } from 'react';
import axios from 'axios';
import SearchForm from './components/SearchForm';
import BookGrid from './components/BookGrid';
import './App.css'; 

const App = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [searched, setSearched] = useState(false);
  const [searchQuery, setSearchQuery] = useState(''); 

  useEffect(() => {
    if (searched) {
      const fetchBooks = async () => {
        try {
          setLoading(true);
          const response = await axios.get(`https://openlibrary.org/search.json?q=${searchQuery}&page=${currentPage}&limit=20`);
          setBooks(response.data.docs);
          setTotalPages(Math.ceil(response.data.num_found / 20));
        } catch (error) {
          console.error('Error fetching books:', error);
        } finally {
          setLoading(false);
        }
      };

      fetchBooks();
    }
  }, [currentPage, searched, searchQuery]);

  const searchBooks = (query) => {
    setSearchQuery(query); 
    setCurrentPage(1);
    setSearched(true);
  };

  const nextPage = () => {
    setCurrentPage(currentPage + 1);
  };

  const prevPage = () => {
    setCurrentPage(currentPage - 1);
  };

  return (
    <div className="App">
      <h1 className="title">Book Search</h1>
      <SearchForm onSearch={searchBooks} />
      {searched && (
        loading ? (
          <p>Loading...</p>
        ) : (
          <>
            <BookGrid books={books} />
            <div className="pagination">
              <button onClick={prevPage} disabled={currentPage === 1}>Prev</button>
              <span>{currentPage} of {totalPages}</span>
              <button onClick={nextPage} disabled={currentPage === totalPages}>Next</button>
              
            </div>
          </>
        )
      )}
    </div>
  );
};

export default App;
