import Query from 'graphql-query-builder';
import rootSchema from '../../../lib/graphql/rootSchema';

const graphql = require('graphql').graphql;
const expect = require('chai').expect;

describe('GraphQL: App By ID Queries', () => {
  it('Query single app by its id (5fHa6zTDBohz4RrsM) and get a response', (done) => {
    // NodeQuery
    const queryContent = new Query('getAppById', {
      id: '5fHa6zTDBohz4RrsM',
      lang: 'de',
    }).find([
      'id',
      'owner',
    ]);
    const query = `
    {
      ${queryContent}
    }`;
    graphql(rootSchema, query, {}, {})
      .then(({ errors, data }) => {
        expect(errors).to.be.equal(undefined);
        expect(data).to.have.property('getAppById');
        done();
      })
      .catch((e) => {
        console.error('Problem:');
        console.error(e);
      });
  });
});
