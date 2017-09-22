import React, { Component } from 'react';
import { Link } from 'react-router-dom';


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
    console.log(books)

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
                      <li key={book.title}>
                        <div className="book">
                          <div className="book-top">
                            <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${book.imageLinks.smallThumbnail})` }}></div>
                            <div className="book-shelf-changer">
                              <select
                                value={book.shelf}
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
                          <div className="book-authors">{book.authors.join(', ')}</div>
                        </div>
                      </li>
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
