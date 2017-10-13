import {
  GraphQLObjectType,
} from 'graphql';

import server from './models/server/serverQuery';
import responses from './models/responses/responsesQuery';


export default new GraphQLObjectType({
  name: 'Query',
  fields: () => ({
    ...responses,
    ...server,
  }),
});
