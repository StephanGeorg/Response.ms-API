import Url from 'url';
import {
  GraphQLObjectType,
  GraphQLString,
  GraphQLNonNull,
  GraphQLList,
  GraphQLInt,
  GraphQLFloat,
  GraphQLScalarType,
} from 'graphql';

import {
  get,
} from './responsesResolver';

export default {

  get: {
    type: new GraphQLObjectType({
      name: 'Response',
      descripton: 'A benchmark of a GET response',
      fields: {
        dns: {
          type: new GraphQLScalarType({
            name: 'DNS',
            serialize(value) {
              return value;
            },
          }),
          description: 'A DNS lookup',
        },
      },
    }),
    description: 'Give the all benchmark data for a GET request',
    args: {
      url: {
        type: new GraphQLNonNull(GraphQLString),
        description: 'A URL of a webapp or endpoint.',
      },
    },
    async resolve(source, { url }, context = {}) {
      if (!Url.parse(url, true).host) throw new Error('Wrong URL format: http://example.com/path/to/endpoint');
      const benchmark = await get(source, { url });
      // context.lang = lang;
      return {
        dns: benchmark,
      };
    },
  },
};
