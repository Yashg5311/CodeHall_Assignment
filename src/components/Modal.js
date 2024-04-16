import React from 'react';
import './Modal.css'; 
const Modal = ({ book, onClose }) => {
  return (
    <div className='modal-overlay'>
      <div className='modal'>
        <button className='close-button' onClick={onClose}>X</button>
        <h2>{book.title}</h2>
        {book.cover_i && <img src={`https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg`} alt="Book Cover" />}
        <p>Author: {book.author_name}</p>
        <p>This Book is written by {book.author_name}. Hope you enjoy reading it!</p>
        
      </div> 
    </div>
  );
}

export default Modal;
