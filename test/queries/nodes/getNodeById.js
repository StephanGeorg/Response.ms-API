import Query from 'graphql-query-builder';
import rootSchema from '../../../lib/graphql/rootSchema';

const graphql = require('graphql').graphql;
const expect = require('chai').expect;

describe('GraphQL: Node By ID Queries', () => {
  it('Query single node by its id (6SF75swGwHN4ejND5) and get a response', (done) => {
    // NodeQuery
    const queryContent = new Query('getNodeById', {
      id: '6SF75swGwHN4ejND5',
      app: '5fHa6zTDBohz4RrsM',
      lang: 'de',
    }).find([
      'id',
      'appId',
      'elements',
      'status',
      {
        address: [
          'w3w',
          'rpath',
          'country',
          'address',
          'postal',
          {
            regions: [
              'id',
              'name',
              'path',
              {
                bbox: [
                  'type',
                ],
              },
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
        expect(errors).to.be.equal(undefined);
        expect(data).to.have.property('getNodeById');
        done();
      })
      .catch((e) => {
        console.error('Problem:');
        console.error(e);
      });
  });

  it('Query a node which does not exists. Should end in an error', (done) => {
    // NodeQuery
    const queryContent = new Query('getNodeById', {
      id: '11',
      app: '5fHa6zTDBohz4RrsM',
      lang: 'en',
    }).find([
      'id',
      'elements',
    ]);
    const query = `
    {
      ${queryContent}
    }`;
    graphql(rootSchema, query, {}, {})
      .then(({ data }) => {
        expect(data).to.have.property('getNodeById')
          .and.to.be.an('array')
          .and.to.have.lengthOf(0);
        done();
      })
      .catch((e) => {
        console.error('Problem:');
        console.error(e);
      });
  });

  it('Query multiple nodes by its ids (6SF75swGwHN4ejND5, cPAMgigAMwHJjAxha) and get a response', (done) => {
    // NodeQuery
    const queryContent = new Query('getNodeById', {
      app: '5fHa6zTDBohz4RrsM',
      id: ['6SF75swGwHN4ejND5', 'cPAMgigAMwHJjAxha'],
      lang: 'de',
    }).find([
      'id',
      'appId',
      'status',
    ]);
    const query = `
    {
      ${queryContent}
    }`;
    graphql(rootSchema, query, {}, {})
      .then(({ errors, data }) => {
        expect(errors).to.be.equal(undefined);

        expect(data).to.have.property('getNodeById')
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
