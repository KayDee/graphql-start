import React, { Component } from 'react'
import { graphql } from 'react-apollo'


import { BOOK_INFO } from '../queries/queries'

// const { ObjectId } = require('mongodb')


class BookInfo extends Component {

  displayInfo(){
    const { book } = this.props.data
    if(book){
      return (<div>
        <h2>{ book.name }</h2>
        <span>{ book.genre }</span>
        <h4>By - <b>{ book.author.name }</b></h4>
        <span>More books by this author</span>
        <ul className="other-books">
          { book.author.books.map(newBook => (<li key={newBook._id}>{ newBook.name }</li>)) }
        </ul>
      </div>)
    }
    else{
      return (<div><p>No book selected.</p></div>)
    }
  }

  render() {
    console.log(this.props)
    return (
      <div className="book-info">
        { this.displayInfo() }
      </div>
    )
  }
}

export default graphql(BOOK_INFO, {
  options: (props) => {
    console.log(props)
    return {
      variables: {
        id: props.bookId
        // id: new ObjectId(props.bookId)
      }
    }
  }
})(BookInfo)
