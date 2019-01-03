import React, { Component } from 'react'
import { graphql } from 'react-apollo'

import { ALL_AUTHORS } from '../queries/queries'

class AddBook extends Component {
  displayAllAuthors(){
    console.log(this.props.data)
    if(this.props.data.loading)
      return(<option disabled>Loading authors...</option>)
    else{
      let authors = this.props.data.authors
      return authors.map(auth => (<option>{auth.name}</option>))
    }
  }

  render() {
    return (
      <div>
        <form id="add-book">
          <div className="field">
            <label>Name: </label>
            <input type="text" />
          </div>

          <div className="field">
            <label>Genre: </label>
            <input type="text" />
          </div>

          <div className="field">
            <label>Author: </label>
            <select>
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
