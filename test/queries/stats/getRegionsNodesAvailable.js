import Query from 'graphql-query-builder';
import rootSchema from '../../../lib/graphql/rootSchema';

const graphql = require('graphql').graphql;
const expect = require('chai').expect;

describe('GraphQL: Node Stats', () => {
  it('Query regions where nodes are available by app (5fHa6zTDBohz4RrsM) in region (51477)', (done) => {
    const queryContent = new Query('getRegionsNodesAvailable', {
      app: '5fHa6zTDBohz4RrsM',
      region: 51477,
    }).find([
      'regions',
    ]);
    const query = `
    {
      ${queryContent}
    }`;
    graphql(rootSchema, query)
      .then(({ errors, data }) => {
        if (errors) {
          console.log(errors);
        }
        expect(errors).to.be.equal(undefined);
        // check result
        expect(data).to.have.property('getRegionsNodesAvailable');
        expect(data.getRegionsNodesAvailable).to.be.an('object');
        // check field
        expect(data).to.have.property('getRegionsNodesAvailable')
          .and.to.have.nested.property('regions')
          .and.to.be.an('array');
        done();
      })
      .catch((e) => {
        console.error('Problem:');
        console.error(e);
      });
  });
});
