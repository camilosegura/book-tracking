import React, { Component } from 'react';
import * as BooksAPI from './BooksAPI';
import { Route } from 'react-router-dom';
import ListBooks from './ListBooks';
import SearchBooks from './SearchBooks';
import './App.css'

class BooksApp extends Component {
  state = {
    books: []
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
            <SearchBooks />
          )}
        />
      </div>
    )
  }
}

export default BooksApp
