const graphql = require('graphql')
const { MongoClient, ObjectId } = require('mongodb')

const {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLID,
  GraphQLString,
  GraphQLInt,
  GraphQLList
} = graphql

let db = null
let collection = [] // [ Book_Collection , Author_Collection ]
MongoClient.connect('mongodb://kay:papaya25@ds157320.mlab.com:57320/graphql-sample', {useNewUrlParser: true}, (err, client) => {
  if(err)
    console.error(err)
  else{
    db = client.db('graphql-sample')
    collection[0] = db.collection('books')
    collection[1] = db.collection('authors')
  }
})


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
  },
  {
    id: '4',
    name: 'The Hero of Ages',
    genre: 'Fantasy',
    authorID: '2'
  },
  {
    id: '5',
    name: 'The Color of Magic',
    genre: 'Fantasy',
    authorID: '3'
  },
  {
    id: '6',
    name: 'The Light Fantastic',
    genre: 'Fantasy',
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
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    genre: { type: GraphQLString },
    author: {
      type: AuthorType,
      resolve: (parent, args) => {
        // return DUMMY_AUTHORS.find(author => author.id == parent.authorID)
        console.log(collection[1].findOne({_id: parent.authorID}))
        return collection[1].findOne({_id: parent.authorID})
      }
    }
  })
})

const AuthorType = new GraphQLObjectType({
  name: 'Author',
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    age: { type: GraphQLInt },
    books: {
      type: new GraphQLList(BookType),
      resolve: (parent, args) => {
        // return DUMMY_BOOKS.filter(book => book.authorID == parent.id)
        console.log(collection[0].find({authorID: parent.id}).toArray())
        return collection[0].find({authorID: parent.id}).toArray()
      }
    }
  })
})


const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    book: {
      type: BookType,
      args: { id: { type: GraphQLID } },
      resolve: (parent, args) => {
        // console.log(collection[0].findOne({_id: args.id}).then(result => console.log(result))
        return collection[0].findOne({_id: ObjectId(args.id)}).then(result => result)
      }
    },
    author: {
      type: AuthorType,
      args: { id: { type: GraphQLID } },
      resolve: (parent, args) => {
        // collection[1].findOne({_id: ObjectId(args.id)}).then(result => console.log(result))
        return collection[1].findOne({_id: ObjectId(args.id)}).then(result => result)
      }
    },
    books: {
      type: new GraphQLList(BookType),
      resolve: (parent, args) => {
        // return DUMMY_BOOKS
        console.log(collection[0].find({}).toArray())
        return collection[0].find({}).toArray()
      }
    },
    authors: {
      type: new GraphQLList(AuthorType),
      resolve: (parent, args) => {
        // return DUMMY_AUTHORS
        console.log(collection[1].find().toArray())
        return collection[1].find().toArray()
      }
    }
  }
})

const Mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: () => ({
    addAuthor: {
      type: AuthorType,
      args: {
        name: { type: GraphQLString },
        age: { type: GraphQLInt }
      },
      resolve: (parent, args) => {
        let obj = {
          name: args.name,
          age: args.age
        }
        return collection[1].insertOne(obj).then(result => {
          console.log(result.ops[0])
          return result.ops[0]
        })
      }
    },
    addBook: {
      type: BookType,
      args: {
        name: { type: GraphQLString },
        genre: { type: GraphQLString },
        authorID: { type: GraphQLID }
      },
      resolve: (parent, args) => {
        let obj = {
          name: args.name,
          genre: args.genre,
          authorID: args.authorID
        }
        return collection[0].insertOne(obj).then(result => {
          console.log(result.ops[0])
          return result.ops[0]
        })
      }
    }
  })
})

module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation: Mutation
})