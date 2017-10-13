import Query from 'graphql-query-builder';
import rootSchema from '../../../lib/graphql/rootSchema';

const graphql = require('graphql').graphql;
const expect = require('chai').expect;

describe('GraphQL: Region By ID Queries', () => {
  it('Query single region by its id (51477) and get a response', (done) => {
    // NodeQuery
    const queryContent = new Query('getRegionById', {
      id: [51477],
      lang: 'de',
    }).find([
      'id',
    ]);
    const query = `
    {
      ${queryContent}
    }`;
    graphql(rootSchema, query, {}, {})
      .then(({ errors, data }) => {
        expect(errors).to.be.equal(undefined);
        expect(data).to.have.property('getRegionById')
          .and.to.be.an('array')
          .and.to.have.lengthOf(1);
        done();
      })
      .catch((e) => {
        console.error('Problem:');
        console.error(e);
      });
  });

  it('Query multiple regions by its id (51477, 62422) and get the responses', (done) => {
    // NodeQuery
    const queryContent = new Query('getRegionById', {
      id: [51477, 62422],
      lang: 'de',
    }).find([
      'id',
    ]);
    const query = `
    {
      ${queryContent}
    }`;
    graphql(rootSchema, query, {}, {})
      .then(({ errors, data }) => {
        expect(errors).to.be.equal(undefined);
        expect(data).to.have.property('getRegionById')
          .and.to.be.an('array')
          .and.to.have.lengthOf(2);
        done();
      })
      .catch((e) => {
        console.error('Problem:');
        console.error(e);
      });
  });
});
