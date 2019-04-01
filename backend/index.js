import { GraphQLServer, PubSub} from 'graphql-yoga'
import cookieParser from 'cookie-parser'
import Query from './resolvers/Query'
import Mutation from './resolvers/Mutation'
import Subscription from './resolvers/Subscription'
import Post from './resolvers/Post'
import dotenv from 'dotenv'
import mongoose from 'mongoose'
import jwt from 'jsonwebtoken'

dotenv.config({ path: './credentials.env' })

mongoose.connect(
  `mongodb://${process.env.DB_USER}:${process.env.DB_PASSWORD}@ds223605.mlab.com:23605/posts_graphql`, 
  {
    useCreateIndex: true,
    useNewUrlParser: true
  }
)
  .then(() => {
    console.log('Database connection successful')
  })
  .catch(err => {
    console.error('Database connection error')
  })


const pubsub = new PubSub()


const server = new GraphQLServer({
  typeDefs: './schema.graphql',
  resolvers: {
    Query,
    Mutation,
    Subscription,
    Post
  },
  context: ({ request, response, ...rest }) => {
    return { 
      request,
      response,
      db: mongoose,
      pubsub
    }
  }
})

server.express.use(cookieParser())

server.express.use((req, res, next) => {
  console.log('middleware working')
  const { token } = req.cookies
  console.log(req.cookies)
  if (token) {
    const { userId } = jwt.verify(token, process.env.APP_SECRET)
    console.log('userId',userId)
    req.userId = userId
  }
  next()
});

server.start(
  {
    port: 4000,
    endpoint: '/',
    subscriptions: '/subscriptions',
    playground: '/playground',
    cors: {
      credentials: true,
      origin: process.env.FRONTEND_URL,
    }
  },
  deets => {
    console.log(`Server is now running on port http://localhost:${deets.port}`);
  }
)