import React from 'react';
import './Modal.css';

const Modal = ({ author, authorDetails, onClose }) => {
  return (
    <div className='modal-overlay'>
      <div className='modal'>
        <button className='close-button' onClick={onClose}>X</button>
        <h2>{author.author_name}</h2>
       
        {authorDetails && (
          <>
            {authorDetails.photos && authorDetails.photos.length > 0 ? (
              <img src={`https://covers.openlibrary.org/b/id/${authorDetails.photos[0]}-M.jpg`} alt="Author Cover" />
            ) : (
              <p>No photo available</p>
            )}
            {authorDetails.bio ? (
              typeof authorDetails.bio === 'string' ? (
                <p>{authorDetails.bio}</p>
              ) : (
                <p>{authorDetails.bio.value}</p>
              )
            ) : (
              <p>No bio available</p>
            )}
            {/* Add more details as needed */}
          </>
        )}
      </div>
    </div>
  );
};

export default Modal;
