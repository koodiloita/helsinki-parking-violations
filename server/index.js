const { GraphQLServer } = require('graphql-yoga')
const { Prisma } = require('prisma-binding')

const Query = require('./src/resolvers/Query')

const resolvers = {
  Query
}

const server = new GraphQLServer({
  typeDefs: './src/schema.graphql',
  resolvers,
  context: (req) => ({
    ...req,
    db: new Prisma({
      typeDefs: 'src/generated/prisma.graphql',
      endpoint: 'http://localhost:4466/parking/dev',
      debug: true,
      secret: 'foo'
    })
  })
})
server.start(() => console.log('Server is running on localhost:4000'))
