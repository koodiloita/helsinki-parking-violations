const { GraphQLServer } = require('graphql-yoga')
const db = require('./src/db')

db.initializeDb()

const Query = require('./src/resolvers/Query')

const resolvers = {
  Query
}

const server = new GraphQLServer({
  typeDefs: './src/schema.graphql',
  resolvers
})
server.start(() => console.log('Server is running on localhost:4000'))
