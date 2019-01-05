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

const BOOK_INFO = gql`
query($id: ID!){
  book(_id: $id){
    name
    genre
    author{
      name
      age
      books{
        name
        genre
      }
    }
  }
}
`


export {
  ALL_AUTHORS,
  ALL_BOOKS,
  ADD_BOOK,
  BOOK_INFO
}