import React, { Component } from 'react'
import { graphql } from 'react-apollo'


import { BOOK_INFO } from '../queries/queries'

// const { ObjectId } = require('mongodb')


class BookInfo extends Component {

  render() {
    console.log(this.props)
    return (
      <div id="book-details">
          <p>Output Details: --</p>
      </div>
    )
  }
}

export default graphql(BOOK_INFO, {
  options: (props) => {
    return {
      variables: {
        id: props.bookId
        // id: new ObjectId(props.bookId)
      }
    }
  }
})(BookInfo)
