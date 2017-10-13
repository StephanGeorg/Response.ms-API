import Query from 'graphql-query-builder';
import rootSchema from '../../../lib/graphql/rootSchema';

const graphql = require('graphql').graphql;
const expect = require('chai').expect;

describe('GraphQL: Nearest Nodes by Point Query', () => {
  it('Query nearest (airline) nodes by a point (52.520008,13.404954) and limit to 5', (done) => {
    const queryContent = new Query('getNearestNodesByPoint', {
      lat: 52.520008,
      lng: 13.404954,
      limit: 5,
      app: '5fHa6zTDBohz4RrsM',
    }).find([
      'id',
      {
        distance: [
          'airline',
        ],
      },
    ]);
    const query = `
    {
      ${queryContent}
    }`;

    graphql(rootSchema, query, {}, {})
      .then(({ errors, data }) => {
        if (errors) console.log(errors);
        expect(errors).to.be.equal(undefined);
        expect(data).to.have.property('getNearestNodesByPoint');
        expect(data.getNearestNodesByPoint).to.be.an('array');
        expect(data.getNearestNodesByPoint).to.have.lengthOf(5);
        done();
      })
      .catch((e) => {
        console.error('Problem:');
        console.error(e);
      });
  });

  it('Query nearest (airline) nodes by a point (52.520008,13.404954) and radius 1000m', (done) => {
    const queryContent = new Query('getNearestNodesByPoint', {
      lat: 52.520008,
      lng: 13.404954,
      radius: 1000,
      app: '5fHa6zTDBohz4RrsM',
    }).find([
      'id',
      {
        distance: [
          'airline',
        ],
      },
    ]);
    const query = `
    {
      ${queryContent}
    }`;

    graphql(rootSchema, query, {}, {})
      .then(({ errors, data }) => {
        if (errors) console.log(errors);
        expect(errors).to.be.equal(undefined);
        expect(data).to.have.property('getNearestNodesByPoint');
        expect(data.getNearestNodesByPoint).to.be.an('array');
        expect(data.getNearestNodesByPoint).to.have.lengthOf.above(0);
        done();
      })
      .catch((e) => {
        console.error('Problem:');
        console.error(e);
      });
  });

  it('Query nearest (airline) nodes /w car distance, duration by a point (52.520008,13.404954) and limit to 5', (done) => {
    const queryContent = new Query('getNearestNodesByPoint', {
      lat: 52.520008,
      lng: 13.404954,
      limit: 5,
      app: '5fHa6zTDBohz4RrsM',
    }).find([
      'id',
      {
        distance: [
          'airline',
          {
            car: [
              'distance',
              'duration',
            ],
          },
        ],
      },
    ]);
    const query = `
    {
      ${queryContent}
    }`;

    graphql(rootSchema, query, {}, {})
      .then(({ errors, data }) => {
        if (errors) console.log(errors);
        expect(errors).to.be.equal(undefined);
        // check results array
        expect(data).to.have.property('getNearestNodesByPoint');
        expect(data.getNearestNodesByPoint).to.be.an('array');
        expect(data.getNearestNodesByPoint).to.have.lengthOf(5);
        // check fields
        expect(data.getNearestNodesByPoint[0]).to.have.property('distance')
          .and.to.have.nested.property('car')
          .and.to.have.nested.property('distance')
          .and.to.be.a('number');

        expect(data.getNearestNodesByPoint[0]).to.have.property('distance')
          .and.to.have.nested.property('car')
          .and.to.have.nested.property('duration')
          .and.to.be.a('number');
        done();
      })
      .catch((e) => {
        console.error('Problem:');
        console.error(e);
      });
  });

  it('Query nearest (airline) nodes /w foot distance, duration by a point (52.520008,13.404954) and limit to 5', (done) => {
    const queryContent = new Query('getNearestNodesByPoint', {
      lat: 52.520008,
      lng: 13.404954,
      limit: 5,
      app: '5fHa6zTDBohz4RrsM',
    }).find([
      'id',
      {
        distance: [
          'airline',
          {
            foot: [
              'distance',
              'duration',
            ],
          },
        ],
      },
    ]);
    const query = `
    {
      ${queryContent}
    }`;

    graphql(rootSchema, query, {}, {})
      .then(({ errors, data }) => {
        if (errors) console.log(errors);
        // check results
        expect(errors).to.be.equal(undefined);
        expect(data).to.have.property('getNearestNodesByPoint');
        expect(data.getNearestNodesByPoint).to.be.an('array');
        expect(data.getNearestNodesByPoint).to.have.lengthOf(5);
        // check fields
        expect(data.getNearestNodesByPoint[0]).to.have.property('distance')
          .and.to.have.nested.property('foot')
          .and.to.have.nested.property('distance')
          .and.to.be.a('number');

        expect(data.getNearestNodesByPoint[0]).to.have.property('distance')
          .and.to.have.nested.property('foot')
          .and.to.have.nested.property('duration')
          .and.to.be.a('number');
        done();
      })
      .catch((e) => {
        console.error('Problem:');
        console.error(e);
      });
  });

});
