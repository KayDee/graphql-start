import React, { Component } from 'react'
import { graphql } from 'react-apollo'

import { ALL_BOOKS } from '../queries/queries'


class BookList extends Component {
  displayAllBooks(){
    console.log(this.props.data)
    if(this.props.data.loading)
      return(<div>Loading ...</div>)
    else{
      let books = this.props.data.books
      return books.map(book => (<li>{book.name}</li>))
    }
  }

  render() {
    return (
      <div>
        <ul id="book-list">
          { this.displayAllBooks() }
        </ul>
      </div>
    );
  }
}

export default graphql(ALL_BOOKS)(BookList)
