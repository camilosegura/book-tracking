import React from 'react';
import Book from './Book';

const Shelf = ({books, category, onChangeShelf}) => (
  <div className="bookshelf">
    <h2 className="bookshelf-title">{books[category].title}</h2>
    <div className="bookshelf-books">
      <ol className="books-grid">
        {books[category].list.map((book) => (
          <Book
            key={book.id}
            book={book}
            onChangeShelf={onChangeShelf}
          />
        ))}
      </ol>
    </div>
  </div>
);

export default Shelf;
