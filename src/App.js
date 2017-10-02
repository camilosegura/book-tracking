import React, { Component } from 'react';
import * as BooksAPI from './BooksAPI';
import { Route, Switch } from 'react-router-dom';
import ListBooks from './ListBooks';
import SearchBooks from './SearchBooks';
import Page404 from './Page404';
import './App.css'

class BooksApp extends Component {
  state = {
    books: [],
    searchBooks: []
  }

  componentDidMount() {
    BooksAPI.getAll().then((books) => {
      books = books.map((book) => {
        book.shelf = book.shelf || 'none';

        return book;
      });

      this.setState({ books });
    })
  }

  onChangeShelf = (book, shelf) => {
    BooksAPI.update(book, shelf).then(() => {
      book.shelf = shelf
      this.setState(previousState => ({
        books: previousState.books.filter(b=> b.id !== book.id).concat([book])
      }));
    });
  }

  onSearchChangeShelf = (book, shelf) => {
    book.shelf = shelf;

    this.setState((state) => {
      state.books.push(book);
      return {
        books: state.books
      }
    });

    BooksAPI.update(book, shelf);
  }

  _searchAssignShelf(books) {
    return books.map((book) => {
      this.state.books.forEach((bk) => {
        if (book.id === bk.id) {
          book.shelf = bk.shelf;
        }
      });

      book.shelf = book.shelf || 'none';

      return book;
    });
  }

  onSearch = (query) => {
    BooksAPI.search(query).then((books) => {

      if (books) {
        if (books.error) {
          console.log(books.error);
          books = [];
        } else {
          books = this._searchAssignShelf(books);
        }

      } else {
        books = books = [];
      }

      this.setState({
        searchBooks: books
      });

    });
  }

  render() {

    return (
      <div className="app">
        <Switch>
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
                onChangeShelf={this.onSearchChangeShelf}
                searchBooks={this.state.searchBooks}
              />
            )}
          />
          <Route component={Page404} />
        </Switch>
      </div>
    )
  }
}

export default BooksApp
