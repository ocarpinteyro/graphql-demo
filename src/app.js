import mongoose from "mongoose";
import { GraphQLServer } from "graphql-yoga";
import { makeExecutableSchema } from "graphql-tools";
import { applyMiddleware } from "graphql-middleware";
import graphqlConfig from "./api";
import { authMiddleware } from "./api/middlewares";
import { getDateInNumbers, parseDate } from "./utils/utils";

mongoose.Promise = global.Promise;
mongoose.connect("mongodb://localhost:27017/gql_db", { useNewUrlParser: true });

const PORT = 8080;

const options = {
    tracing: true,
    debug: true,
    port: PORT,
    endpoint: "/graphql",
    playground: "/docs",
};

// Create the schema
const schema = makeExecutableSchema({
    typeDefs: graphqlConfig.typeDefs,
    resolvers: graphqlConfig.resolvers,
});

// Apply middlewares on the schema
const protectedSchema = applyMiddleware(schema, authMiddleware);

// Provided the protected Schema to GraphQL Server
const server = new GraphQLServer({
    schema: protectedSchema,
    context: graphqlConfig.context,
});

const dateInNumbers = getDateInNumbers();
console.log(dateInNumbers);
const date = parseDate(dateInNumbers);
console.log(date);

server.start(options, () => console.log(`Server GraphQL is running on localhost:${PORT}`))
