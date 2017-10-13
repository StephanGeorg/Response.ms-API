import Query from 'graphql-query-builder';
import rootSchema from '../../../lib/graphql/rootSchema';

const { graphql } = require('graphql');
const { expect } = require('chai');

describe('GraphQL: Node Stats', () => {
  it('Query cached node/region stats for single region', (done) => {
    const queryContent = new Query('getStats', {
      app: '5fHa6zTDBohz4RrsM',
      regions: [51477],
    }).find([
      'cache',
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
        expect(data).to.have.property('getStats');
        expect(data.getStats).to.be.an('object')
          .and.to.have.property('cache')
          .and.to.be.an('array');
        done();
      })
      .catch((e) => {
        console.error('Problem:');
        console.error(e);
      });
  });

  it('Query cached node/region stats for multiple regions', (done) => {
    const queryContent = new Query('getStats', {
      app: '5fHa6zTDBohz4RrsM',
      regions: [51477, 61422],
    }).find([
      'cache',
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
        expect(data).to.have.property('getStats');
        expect(data.getStats).to.be.an('object')
          .and.to.have.property('cache')
          .and.to.be.an('array');
        done();
      })
      .catch((e) => {
        console.error('Problem:');
        console.error(e);
      });
  });

  it('Query cached node/world stats', (done) => {
    const queryContent = new Query('getStats', {
      app: '5fHa6zTDBohz4RrsM',
      regions: [0],
    }).find([
      'cache',
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
        expect(data).to.have.property('getStats');
        expect(data.getStats).to.be.an('object')
          .and.to.have.property('cache')
          .and.to.be.an('array');
        done();
      })
      .catch((e) => {
        console.error('Problem:');
        console.error(e);
      });
  });
});
