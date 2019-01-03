import { gql } from 'apollo-boost'


const ALL_AUTHORS = gql`
{
  authors{
    name
  }
}
`
const ALL_BOOKS = gql`
{
  books{
    name
  }
}
`


export {
  ALL_AUTHORS,
  ALL_BOOKS
}