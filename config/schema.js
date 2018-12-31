const graphql = require('graphql')

const {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLID,
  GraphQLString,
  GraphQLInt
} = graphql

const DUMMY_BOOKS = [
  {
    id: '1',
    name: 'Name of the Wind',
    genre: 'Fantasy',
    authorID: '1'
  },
  {
    id: '2',
    name: 'The Final Empire',
    genre: 'Fantasy',
    authorID: '2'
  },
  {
    id: '3',
    name: 'The Long Earth',
    genre: 'Sci-Fi',
    authorID: '3'
  }
]

const DUMMY_AUTHORS = [
  {
    id: '1',
    name: 'Patrick Rothfuss',
    age: 44
  },
  {
    id: '2',
    name: 'Brandon Sanderson',
    age: 42
  },
  {
    id: '3',
    name: 'Terry Pratchett',
    age: 66
  }
]


const BookType = new GraphQLObjectType({
  name: 'Book',
  fields: {
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    genre: { type: GraphQLString }
  }
})

const AuthorType = new GraphQLObjectType({
  name: 'Author',
  fields: {
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    age: { type: GraphQLInt }
  }
})


const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    book: {
      type: BookType,
      args: { id: { type: GraphQLID } },
      resolve: (parent, args) => {
        return DUMMY_BOOKS.find(book => book.id == args.id)
      }
    },
    author: {
      type: AuthorType,
      args: { id: { type: GraphQLID } },
      resolve: (parent, args) => {
        return DUMMY_AUTHORS.find(author => author.id == args.id)
      }
    }
  }
})

module.exports = new GraphQLSchema({
  query: RootQuery
})