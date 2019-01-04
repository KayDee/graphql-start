import React, { Component } from 'react'
import { graphql, compose } from 'react-apollo'

import { ALL_BOOKS, ALL_AUTHORS, ADD_BOOK } from '../queries/queries'

class AddBook extends Component {
  constructor(props){
    super(props)
    this.state = {
      name: '',
      genre: '',
      authorID: ''
    }
  }
  displayAllAuthors(){
    let authors = this.props.ALL_AUTHORS
    // console.log(this.props)
    if(authors.loading)
      return(<option disabled>Loading authors...</option>)
    else{
      return authors.authors.map(auth => (<option key={auth._id} value={auth._id}>{auth.name}</option>))
    }
  }

  submitForm(e){
    e.preventDefault()
    // console.log(this.state)
    this.props.ADD_BOOK({
      variables: {
        name: this.state.name,
        genre: this.state.genre,
        authorID: this.state.authorID
      },
      refetchQueries: () => [
        {query: ALL_BOOKS }
      ]
    })

  }

  render() {
    return (
      <div>
        <form id="add-book" onSubmit={this.submitForm.bind(this)}>
          <div className="field">
            <label>Name: </label>
            <input type="text" onChange={(e) => this.setState({name: e.target.value})}/>
          </div>

          <div className="field">
            <label>Genre: </label>
            <input type="text" onChange={(e) => this.setState({genre: e.target.value})}/>
          </div>

          <div className="field">
            <label>Author: </label>
            <select onChange={(e) => this.setState({authorID: e.target.value})}>
              <option>-- Select --</option>
              { this.displayAllAuthors() }
            </select>
          </div>

          <button> + </button>
        </form>
      </div>
    );
  }
}

export default compose(
  graphql(ALL_AUTHORS, {name: "ALL_AUTHORS"}),
  graphql(ADD_BOOK, {name: "ADD_BOOK"}),
)(AddBook)
