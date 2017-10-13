import Query from 'graphql-query-builder';
import rootSchema from '../../../lib/graphql/rootSchema';

const graphql = require('graphql').graphql;
const expect = require('chai').expect;

describe('GraphQL: Nodes by Region Query', () => {
  it('Query nodes by a regionId (62422) w/ default limit (10).', (done) => {
    const queryContent = new Query('getNodesByRegion', {
      regionId: [62422],
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
        expect(data).to.have.property('getNodesByRegion');
        expect(data.getNodesByRegion).to.be.an('array');
        expect(data.getNodesByRegion).to.have.lengthOf(10);
        done();
      })
      .catch((e) => {
        console.error('Problem:');
        console.error(e);
      });
  });

  it('Query nodes by multiple regionIds (62422, 62782) w/ default limit (10).', (done) => {
    const queryContent = new Query('getNodesByRegion', {
      regionId: [62422, 62782],
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
        expect(data).to.have.property('getNodesByRegion');
        expect(data.getNodesByRegion).to.be.an('array');
        expect(data.getNodesByRegion).to.have.lengthOf(10);
        done();
      })
      .catch((e) => {
        console.error('Problem:');
        console.error(e);
      });
  });

  it('Query nodes by a regionId (777777) which does not exists.', (done) => {
    const queryContent = new Query('getNodesByRegion', {
      regionId: [777777],
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
        expect(data).to.have.property('getNodesByRegion');
        expect(data.getNodesByRegion).to.be.an('array');
        expect(data.getNodesByRegion).to.have.lengthOf(0);
        done();
      })
      .catch((e) => {
        console.error('Problem:');
        console.error(e);
      });
  });

  it('Query nodes by a regionId (62422) and limit to 5.', (done) => {
    const queryContent = new Query('getNodesByRegion', {
      regionId: [62422],
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
        expect(data).to.have.property('getNodesByRegion');
        expect(data.getNodesByRegion).to.be.an('array');
        expect(data.getNodesByRegion).to.have.lengthOf(5);
        done();
      })
      .catch((e) => {
        console.error('Problem:');
        console.error(e);
      });
  });

  it('Query nodes by a regionId (62422) and return all nodes (limit: 0).', (done) => {
    const queryContent = new Query('getNodesByRegion', {
      regionId: [62422],
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
        expect(data).to.have.property('getNodesByRegion');
        expect(data.getNodesByRegion).to.be.an('array');
        expect(data.getNodesByRegion).to.have.lengthOf.above(5);
        done();
      })
      .catch((e) => {
        console.error('Problem:');
        console.error(e);
      });
  });


});

/**

*/
