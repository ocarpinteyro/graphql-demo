import express from 'express';
import graphqlHTTP from 'express-graphql';
import schema from './schema';

const app = express();
const PORT = 8080;

app.get('/', (req, res) => {
    return res.send('Hello GraphQL Here!');
});

app.use('/graphql', graphqlHTTP({
    schema: schema,
    graphiql: true,
    context: {
        user: '1',
    },
}));

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
