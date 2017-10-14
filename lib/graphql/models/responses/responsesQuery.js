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
  getDns,
  getRequest,
  getPing,
} from './responsesResolver';

export default {

  get: {
    type: new GraphQLObjectType({
      name: 'Response',
      descripton: 'A benchmark of a GET response',
      fields: {
        url: {
          type: new GraphQLScalarType({
            name: 'Url',
            serialize(value) {
              return value;
            },
          }),
          description: 'A URL object',
        },
        dns: {
          type: new GraphQLScalarType({
            name: 'DNS',
            serialize(value) {
              return value;
            },
          }),
          description: 'A DNS lookup',
          async resolve({ url }) {
            const dnsData = await getDns(url);
            return dnsData;
          },
        },
        request: {
          type: new GraphQLScalarType({
            name: 'Request',
            serialize(value) {
              return value;
            },
          }),
          description: 'A response from Request',
          async resolve({ url }) {
            const reqData = await getRequest(url);
            return reqData;
          },
        },
        ping: {
          type: new GraphQLScalarType({
            name: 'Ping',
            serialize(value) {
              return value;
            },
          }),
          description: 'A Ping response',
          async resolve({ url }) {
            const pingData = await getPing(url);
            return pingData;
          },
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
      // const benchmark = await get(source, { url });
      // context.lang = lang;
      const result = Url.parse(url, true);
      /* benchmark.forEach((d) => {
        Object.assign(result, d);
      }); */
      return {
        url: result,
      };
    },
  },
};
