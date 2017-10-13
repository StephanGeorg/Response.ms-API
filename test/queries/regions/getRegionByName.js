import Query from 'graphql-query-builder';
import rootSchema from '../../../lib/graphql/rootSchema';

const graphql = require('graphql').graphql;
const expect = require('chai').expect;

const name = 'Bologna';

describe('GraphQL: Region By Name Queries', () => {
  it(`Query region by its name (${name}) and get a simple response`, (done) => {
    // NodeQuery
    const queryContent = new Query('getRegionByName', {
      name,
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
        expect(data).to.have.property('getRegionByName')
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
