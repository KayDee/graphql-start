import React, { Component } from 'react'
import ApolloClient from 'apollo-boost'
import { ApolloProvider } from 'react-apollo'

import BookList from './components/BookList'
import AddBook from './components/AddBook'
import BookInfo from './components/BookInfo'

const client = new ApolloClient({
  uri: 'http://localhost:4000/graphql'
})

class App extends Component {
  constructor(props){
    super(props)
    this.state = {
      selected: null
    }
    // this.selectBook = this.selectBook.bind
  }
  selectBook = (book) => {
    this.setState({selected: book})
  }

  render() {
    return (
      <ApolloProvider client={client}>
        <div className="App">
          <h1>Books</h1>
          <BookList selectBook={this.selectBook}/>
          <BookInfo bookId={this.state.selected}/>
          <AddBook />
        </div>
      </ApolloProvider>
    );
  }
}

export default App;
