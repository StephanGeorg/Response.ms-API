import graphqlHTTP from 'express-graphql';
import schema from './rootSchema';

export default function (app) {
  app.use('/graphql', graphqlHTTP({
    schema,
    graphiql: true,
  }));
}
