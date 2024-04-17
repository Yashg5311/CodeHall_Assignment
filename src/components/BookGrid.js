import React, { useState, useEffect } from 'react';
import Modal from './Modal';

const BookGrid = ({ books }) => {
  const [showModal, setShowModal] = useState(false);
  const [selectedAuthor, setSelectedAuthor] = useState({});
  const [authorDetails, setAuthorDetails] = useState(null);

  const filteredBooks = books.filter(book => book.cover_i || book.author_name || book.title);

  useEffect(() => {
    const fetchAuthorDetails = async () => {
      if (selectedAuthor.key) {
        try {
          const response = await fetch(`https://openlibrary.org/authors/${selectedAuthor.key}.json`);
          const data = await response.json();
          setAuthorDetails(data);
        } catch (error) {
          console.error('Error fetching author details:', error);
        }
      }
    };

    fetchAuthorDetails();
  }, [selectedAuthor]);

  const handleAuthorClick = (book) => {
    setSelectedAuthor({
      key: book.author_key,
      title: book.title,
      cover_i: book.cover_i,
      author_name: book.author_name,
    });
    setShowModal(true);
  };

  return (
    <div className="book-grid">
      {filteredBooks.map((book) => (
        <div key={book.key} className="book">
          <img src={`https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg`} alt="Book Cover" />
          <h3>{book.title}</h3>
          <p onClick={() => handleAuthorClick(book)}>
            Author: {book.author_name}
          </p>
        </div>
      ))}
      {showModal && <Modal author={selectedAuthor} authorDetails={authorDetails} onClose={() => setShowModal(false)} />}
    </div>
  );
};

export default BookGrid;
