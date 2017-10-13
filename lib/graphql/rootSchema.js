import { GraphQLSchema } from 'graphql';

import rootQuery from './rootQuery';

export default new GraphQLSchema({
  query: rootQuery,
});
