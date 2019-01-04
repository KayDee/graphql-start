import { gql } from 'apollo-boost'


const ALL_AUTHORS = gql`
{
  authors{
    name
    _id
  }
}
`
const ALL_BOOKS = gql`
{
  books{
    name
    _id
  }
}
`

const ADD_BOOK = gql`
mutation($name: String!, $genre: String!, $authorID: ID!){
  addBook(name: $name, genre: $genre, authorID: $authorID){
    name,
    _id
  }
}
`


export {
  ALL_AUTHORS,
  ALL_BOOKS,
  ADD_BOOK
}