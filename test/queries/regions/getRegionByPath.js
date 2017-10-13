import Query from 'graphql-query-builder';
import rootSchema from '../../../lib/graphql/rootSchema';

const graphql = require('graphql').graphql;
const expect = require('chai').expect;

const path = 'Germany/Berlin'

describe('GraphQL: Region By Path Queries', () => {
  it(`Query region by its path (${path}) and get a simple response`, (done) => {
    // NodeQuery
    const queryContent = new Query('getRegionByPath', {
      path,
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
        expect(data).to.have.property('getRegionByPath')
          .and.to.be.an('array')
          .and.to.have.lengthOf(1);
        done();
      })
      .catch((e) => {
        console.error('Problem:');
        console.error(e);
      });
  });
});
