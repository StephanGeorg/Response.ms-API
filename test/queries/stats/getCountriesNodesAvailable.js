import Query from 'graphql-query-builder';
import rootSchema from '../../../lib/graphql/rootSchema';

const graphql = require('graphql').graphql;
const expect = require('chai').expect;

describe('GraphQL: Node Stats', () => {
  it('Query countries where nodes are available by app (5fHa6zTDBohz4RrsM)', (done) => {
    const queryContent = new Query('getCountriesNodesAvailable', {
      app: '5fHa6zTDBohz4RrsM',
    }).find([
      'countries',
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
        expect(data).to.have.property('getCountriesNodesAvailable');
        expect(data.getCountriesNodesAvailable).to.be.an('object');
        // check field
        expect(data).to.have.property('getCountriesNodesAvailable')
          .and.to.have.nested.property('countries')
          .and.to.be.an('array');
        done();
      })
      .catch((e) => {
        console.error('Problem:');
        console.error(e);
      });
  });
});
