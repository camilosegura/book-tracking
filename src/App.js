import React, { Component } from 'react';
import * as BooksAPI from './BooksAPI';
import { Route } from 'react-router-dom';
import ListBooks from './ListBooks';
import SearchBooks from './SearchBooks';
import './App.css'

class BooksApp extends Component {
  state = {
    books: [],
    searchBooks: []
  }

  componentDidMount() {
    BooksAPI.getAll().then((books) => {
      this.setState({ books });
    })
  }

  onChangeShelf = (book, shelf) => {
    this.setState((state) => ({
      books: state.books.map((el) => {
        if (el.id === book.id) {

          el.shelf = shelf;
        }

        return el;
      })
    }));

    BooksAPI.update(book, shelf);
  }

  onSearch = (query) => {
    BooksAPI.search(query).then((books) => {
      this.setState({
        searchBooks: books
      });
    })
  }

  render() {
    return (
      <div className="app">
        <Route exact path='/' render={() => (
            <ListBooks
              books={this.state.books}
              onChangeShelf={this.onChangeShelf}
            />
          )}
        />
        <Route path='/search' render={() => (
            <SearchBooks
              onSearch={this.onSearch}
              onChangeShelf={this.onChangeShelf}
              searchBooks={this.state.searchBooks}
            />
          )}
        />
      </div>
    )
  }
}

export default BooksApp
