import Query from 'graphql-query-builder';
import rootSchema from '../../../lib/graphql/rootSchema';

const graphql = require('graphql').graphql;
const expect = require('chai').expect;

describe('GraphQL: Nodes by Bound Query', () => {
  it('Query nodes by a bound w/ default limit (10).', (done) => {
    const queryContent = new Query('getNodesByBound', {
      bound: [
        [13.0883500240376, 52.3382599827022],
        [13.0883500240376, 52.6755099903978],
        [13.7611599647432, 52.6755099903978],
        [13.7611599647432, 52.3382599827022],
        [13.0883500240376, 52.3382599827022],
      ],
      app: '5fHa6zTDBohz4RrsM',
    }).find([
      'id',
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
        expect(data).to.have.property('getNodesByBound');
        expect(data.getNodesByBound).to.be.an('array');
        expect(data.getNodesByBound).to.have.lengthOf(10);
        done();
      })
      .catch((e) => {
        console.error('Problem:');
        console.error(e);
      });
  });

  it('Query nodes by a bound and limit to 5.', (done) => {
    const queryContent = new Query('getNodesByBound', {
      bound: [
        [13.0883500240376, 52.3382599827022],
        [13.0883500240376, 52.6755099903978],
        [13.7611599647432, 52.6755099903978],
        [13.7611599647432, 52.3382599827022],
        [13.0883500240376, 52.3382599827022],
      ],
      app: '5fHa6zTDBohz4RrsM',
      limit: 5,
    }).find([
      'id',
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
        expect(data).to.have.property('getNodesByBound');
        expect(data.getNodesByBound).to.be.an('array');
        expect(data.getNodesByBound).to.have.lengthOf(5);
        done();
      })
      .catch((e) => {
        console.error('Problem:');
        console.error(e);
      });
  });

  it('Query nodes by a bound and return all nodes (limit: 0).', (done) => {
    const queryContent = new Query('getNodesByBound', {
      bound: [
        [13.0883500240376, 52.3382599827022],
        [13.0883500240376, 52.6755099903978],
        [13.7611599647432, 52.6755099903978],
        [13.7611599647432, 52.3382599827022],
        [13.0883500240376, 52.3382599827022],
      ],
      app: '5fHa6zTDBohz4RrsM',
      limit: 0,
    }).find([
      'id',
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
        expect(data).to.have.property('getNodesByBound');
        expect(data.getNodesByBound).to.be.an('array');
        expect(data.getNodesByBound).to.have.lengthOf.above(10);
        done();
      })
      .catch((e) => {
        console.error('Problem:');
        console.error(e);
      });
  });
});
