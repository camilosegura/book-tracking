import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Book from './Book';

class ListBooks extends Component {
  state = {
    books: {
      currentlyReading: {
        tile: 'Currently Reading',
        list: []
      },
      wantToRead: {
        tile: 'Want to Read',
        list: []
      },
      read: {
        tile: 'Read',
        list: []
      }
    }
  }

  constructor(props) {
    super(props);

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event, book) {
    this.props.onChangeShelf(book, event.target.value)
  }

  clasify() {
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
      console.log(category)
      books[category].list = this.props.books.filter((book) => (
        book.shelf === category
      ));
    });

    return books;
  }

  render() {
    const books = this.clasify();
    const onChangeShelf = this.props.onChangeShelf;

    return(
      <div className="list-books">

        <div className="list-books-title">
          <h1>MyReads</h1>
        </div>
        <div className="list-books-content">
          <div>
            {Object.keys(books).map((category) => (
              <div className="bookshelf" key={category}>
                <h2 className="bookshelf-title">{books[category].title}</h2>
                <div className="bookshelf-books">
                  <ol className="books-grid">
                    {books[category].list.map((book) => (
                      <Book
                        key={book.title}
                        book={book}
                        onChangeShelf={onChangeShelf}
                      />
                    ))}
                  </ol>
                </div>
              </div>
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
