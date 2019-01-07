import React, { Component } from 'react'
import { graphql } from 'react-apollo'

import { ALL_BOOKS } from '../queries/queries'

import BookInfo from './BookInfo'


class BookList extends Component {
  constructor(props){
    super(props)
    this.state = {
      selected: null
    }
  }

  displayAllBooks(){
    console.log(this.props.data)
    if(this.props.data.loading)
      return(<div>Loading ...</div>)
    else{
      let books = this.props.data.books
      return books.map(book => (<li key={book._id} onClick={(e) => this.setState({selected: book._id})}>{book.name}</li>))
    }
  }

  render() {
    return (
      <div>
        <ul id="book-list">
          { this.displayAllBooks() }
        </ul>
        <BookInfo bookId={this.state.selected}/>
      </div>
    )
  }
}

export default graphql(ALL_BOOKS)(BookList)
