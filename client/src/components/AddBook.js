import React, { Component } from 'react'
import { graphql } from 'react-apollo'

import { ALL_AUTHORS } from '../queries/queries'

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
    console.log(this.props.data)
    if(this.props.data.loading)
      return(<option disabled>Loading authors...</option>)
    else{
      let authors = this.props.data.authors
      return authors.map(auth => (<option>{auth.name}</option>))
    }
  }

  submitForm(e){
    e.preventDefault()
    console.log(this.state)
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

export default graphql(ALL_AUTHORS)(AddBook)
