const graphql = require('graphql')

const {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLID,
  GraphQLString
} = graphql

const DUMMY = [
  {
    id: '1',
    name: 'Name of the Wind',
    genre: 'Fantasy',
  },
  {
    id: '2',
    name: 'The Final Empire',
    genre: 'Fantasy',
  },
  {
    id: '3',
    name: 'The Long Earth',
    genre: 'Sci-Fi',
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

const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    book: {
      type: BookType,
      args: { id: { type: GraphQLID } },
      resolve: (parent, args) => {
        return DUMMY.find(book => book.id == args.id)
      }
    }
  }
})

module.exports = new GraphQLSchema({
  query: RootQuery
})