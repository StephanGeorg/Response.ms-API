import {
  GraphQLObjectType,
  GraphQLString,
} from 'graphql';

export const Server = new GraphQLObjectType({
  name: 'Server',
  description: 'A simple node',
  fields: {
    version: {
      type: GraphQLString,
    },
  },
});
