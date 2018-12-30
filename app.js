const express = require('express')
const graphqlHTTP = require('express-graphql')

const schema = require('./config/schema')

const app = express()

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.post('/graphql', graphqlHTTP({
  schema,
  // graphiql: true
}))
app.get('/graphql', graphqlHTTP({
  schema,
  // graphiql: true
}))

// app.use('/', (req, res) => {
//   res.send('Got it')
// })

app.listen(4000, () => {
  console.log('Listening')
})

export default app