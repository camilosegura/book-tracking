import React, { Component } from 'react';

/**
 * Book component.  Represent a book container
 * @param {Array, callback} props
 */
const Book = ({ book, onChangeShelf }) => (
  <li>
    <div className="book">
      <div className="book-top">
        <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${book.imageLinks && book.imageLinks.smallThumbnail})` }}></div>
        <div className="book-shelf-changer">
          <select
            value={book.shelf || 'none'}
            onChange={(e) => onChangeShelf(book, e.target.value)}>
            <option value="none" disabled>Move to...</option>
            <option value="currentlyReading">Currently Reading</option>
            <option value="wantToRead">Want to Read</option>
            <option value="read">Read</option>
            <option value="none">None</option>
          </select>
        </div>
      </div>
      <div className="book-title">{book.title}</div>
      <div className="book-authors">{ book.authors && book.authors.join(', ') }</div>
    </div>
  </li>
);


export default Book;
