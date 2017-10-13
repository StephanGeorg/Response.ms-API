import Query from 'graphql-query-builder';
import rootSchema from '../../../lib/graphql/rootSchema';

const { graphql } = require('graphql');
const { expect } = require('chai');

describe('GraphQL: Directions queries', () => {
  it('Query a direction w/ 2 steps', (done) => {
    const steps = ['13.437527,52.4945519', '13.4356,52.49405'];
    const queryContent = new Query('getDirections', {
      steps,
    }).find([
      'distance',
      'duration',
      'geometry',
      'raw',
    ]);
    const query = `
    {
      ${queryContent}
    }`;
    graphql(rootSchema, query, {}, {})
      .then(({ errors, data }) => {
        expect(errors).to.be.equal(undefined);
        expect(data).to.have.property('getDirections')
          .and.to.have.property('distance')
          .and.to.be.closeTo(246, 5);
        expect(data).to.have.property('getDirections')
          .and.to.have.property('duration')
          .and.to.be.closeTo(40, 5);
        expect(data).to.have.property('getDirections')
          .and.to.have.property('geometry')
          .and.to.be.a('string');
        expect(data).to.have.property('getDirections')
          .and.to.have.property('raw')
          .and.to.be.a('object')
          .and.to.have.property('code')
          .and.to.be.equal('Ok');
        done();
      })
      .catch((e) => {
        console.error('Problem:');
        console.error(e);
      });
  });
  it('Query a direction w/ multiple steps', (done) => {
    const steps = [
      '13.448338508605959,52.47435727107195',
      '13.437502384185793,52.4943697617207',
      '13.437137603759767,52.498798328236674',
    ];
    const queryContent = new Query('getDirections', {
      steps,
    }).find([
      'distance',
      'duration',
      'geometry',
      'raw',
    ]);
    const query = `
    {
      ${queryContent}
    }`;
    graphql(rootSchema, query, {}, {})
      .then(({ errors, data }) => {
        expect(errors).to.be.equal(undefined);
        expect(data).to.have.property('getDirections')
          .and.to.have.property('distance')
          .and.to.be.closeTo(4658.7, 5);
        expect(data).to.have.property('getDirections')
          .and.to.have.property('duration')
          .and.to.be.closeTo(629.9, 5);
        expect(data).to.have.property('getDirections')
          .and.to.have.property('geometry')
          .and.to.be.a('string');
        expect(data).to.have.property('getDirections')
          .and.to.have.property('raw')
          .and.to.be.a('object')
          .and.to.have.property('code')
          .and.to.be.equal('Ok');
        done();
      })
      .catch((e) => {
        console.error('Problem:');
        console.error(e);
      });
  });
});
