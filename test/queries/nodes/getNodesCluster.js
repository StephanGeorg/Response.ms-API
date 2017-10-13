import Query from 'graphql-query-builder';
import rootSchema from '../../../lib/graphql/rootSchema';

const graphql = require('graphql').graphql;
const expect = require('chai').expect;

describe('GraphQL: Nodes Cluster', () => {
  it('Query cluster by single regionId (62422)', (done) => {
    const queryContent = new Query('getNodesCluster', {
      regionId: [62422],
      app: '5fHa6zTDBohz4RrsM',
    }).find([
      'cluster',
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
        expect(data).to.have.property('getNodesCluster');
        expect(data.getNodesCluster).to.be.an('object');
        // check field
        expect(data).to.have.property('getNodesCluster')
          .and.to.have.nested.property('cluster')
          .and.to.be.a('string');
        done();
      })
      .catch((e) => {
        console.error('Problem:');
        console.error(e);
      });
  });

  it('Query cluster by multiple regionIds (62422, 62782)', (done) => {
    const queryContent = new Query('getNodesCluster', {
      regionId: [62422, 62782],
      app: '5fHa6zTDBohz4RrsM',
    }).find([
      'cluster',
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
        expect(data).to.have.property('getNodesCluster');
        expect(data.getNodesCluster).to.be.an('object');
        // check field
        expect(data).to.have.property('getNodesCluster')
          .and.to.have.nested.property('cluster')
          .and.to.be.a('string');
        done();
      })
      .catch((e) => {
        console.error('Problem:');
        console.error(e);
      });
  });

  it('Query cluster by bound.', (done) => {
    const queryContent = new Query('getNodesCluster', {
      app: '5fHa6zTDBohz4RrsM',
      bound: [
        [13.0883500240376, 52.3382599827022],
        [13.0883500240376, 52.6755099903978],
        [13.7611599647432, 52.6755099903978],
        [13.7611599647432, 52.3382599827022],
        [13.0883500240376, 52.3382599827022],
      ],
    }).find([
      'cluster',
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
        expect(data).to.have.property('getNodesCluster');
        expect(data.getNodesCluster).to.be.an('object');
        // check field
        expect(data).to.have.property('getNodesCluster')
          .and.to.have.nested.property('cluster')
          .and.to.be.a('string');
        done();
      })
      .catch((e) => {
        console.error('Problem:');
        console.error(e);
      });
  });

  it('Query cluster point (52.523403,13.4114) and radius (50000)', (done) => {
    const queryContent = new Query('getNodesCluster', {
      app: '5fHa6zTDBohz4RrsM',
      lat: 52.523403,
      lng: 13.4114,
      radius: 50000,
    }).find([
      'cluster',
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
        expect(data).to.have.property('getNodesCluster');
        expect(data.getNodesCluster).to.be.an('object');
        // check field
        expect(data).to.have.property('getNodesCluster')
          .and.to.have.nested.property('cluster')
          .and.to.be.a('string');
        done();
      })
      .catch((e) => {
        console.error('Problem:');
        console.error(e);
      });
  });
});
