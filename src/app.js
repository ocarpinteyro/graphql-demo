import mongoose from 'mongoose';
import { GraphQLServer } from 'graphql-yoga';
import graphqlConfig from './api';

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/gql_db', { useNewUrlParser: true });

const PORT = 8080;

const options = {
    tracing: true,
    debug: true,
    port: PORT,
    endpoint: '/graphql',
    playground: '/docs',
}

const server = new GraphQLServer(graphqlConfig);
server.start(options, () => console.log(`Server GraphQL is running on localhost:${PORT}`))
