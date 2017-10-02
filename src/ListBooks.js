import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Shelf from './Shelf';

/**
 * List books in bookselfs
 */
class ListBooks extends Component {
  constructor(props) {
    super(props);

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event, book) {
    this.props.onChangeShelf(book, event.target.value)
  }

  classify() {
    const books = {
      currentlyReading: {
        title: 'Currently Reading',
        list: []
      },
      wantToRead: {
        title: 'Want to Read',
        list: []
      },
      read: {
        title: 'Read',
        list: []
      }
    };

    Object.keys(books).forEach((category) => {
      books[category].list = this.props.books.filter((book) => (
        book.shelf === category
      ));
    });

    return books;
  }

  render() {
    const books = this.classify();
    const onChangeShelf = this.props.onChangeShelf;

    return(
      <div className="list-books">

        <div className="list-books-title">
          <h1>MyReads</h1>
        </div>
        <div className="list-books-content">
          <div>
            {Object.keys(books).map((category) => (
              <Shelf
                key={category}
                books={books}
                category={category}
                onChangeShelf={onChangeShelf} />
            ))}
          </div>
        </div>
        <div className="open-search">
          <Link to='/search' >Add a book</Link>
        </div>
      </div>
    );
  }
}

export default ListBooks;
