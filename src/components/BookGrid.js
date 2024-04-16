import React, { useState } from 'react';
import Modal from './Modal';

const BookGrid = ({ books }) => {
  const [showModal, setShowModal] = useState(false);
  const [selectedAuthor, setSelectedAuthor] = useState({});

  const filteredBooks = books.filter(book => book.cover_i || book.author_name || book.title);

  const handleAuthorClick = (book) => {
    setSelectedAuthor({
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
      {showModal && <Modal book={selectedAuthor} onClose={() => setShowModal(false)} />}
    </div>
  );
};

export default BookGrid;
