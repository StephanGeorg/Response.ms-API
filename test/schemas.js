import {
  GraphQLString,
  GraphQLInt,
  GraphQLScalarType,
} from 'graphql';

// Schemas
import { App } from '../lib/graphql/types/app/app';
import { Node } from '../lib/graphql/types/node/node';
import Address from '../lib/graphql/types/address/address';
import Region from '../lib/graphql/types/region/region';
import Distance from '../lib/graphql/types/distance/distance';
import { GeoJSONFeatureObject } from '../lib/graphql/types/geojson/geojson';

const expect = require('chai').expect;

describe('GraphQL: Schemas', () => {
  it('App Schema should have all expected fields of expected type', () => {
    const fields = App.getFields();
    const size = Object.keys(fields).length;

    expect(size).to.equal(6);

    expect(fields).to.have.property('id')
      .and.to.have.nested.property('type')
      .and.to.deep.equals(GraphQLString);

    expect(fields).to.have.property('owner')
      .and.to.have.nested.property('type')
      .and.to.deep.equals(GraphQLString);

    expect(fields).to.have.property('settings')
      .and.to.have.nested.property('type');

    expect(fields).to.have.property('properties')
      .and.to.have.nested.property('type');

    expect(fields).to.have.property('elementGroups')
      .and.to.have.nested.property('type');

    expect(fields).to.have.property('elements')
      .and.to.have.nested.property('type');
  });

  it('Node Schema should have all expected fields of expected type', () => {
    const fields = Node.getFields();
    const size = Object.keys(fields).length;

    expect(size).to.equal(7);

    expect(fields).to.have.property('id')
      .and.to.have.nested.property('type')
      .and.to.deep.equals(GraphQLString);

    expect(fields).to.have.property('appId')
      .and.to.have.nested.property('type')
      .and.to.deep.equals(GraphQLString);

    expect(fields).to.have.property('status')
      .and.to.have.nested.property('type')
      .and.to.deep.equals(GraphQLInt);

    expect(fields).to.have.property('geojson')
      .and.to.have.nested.property('type')
      .and.to.deep.equals(GeoJSONFeatureObject);

    expect(fields).to.have.property('address')
      .and.to.have.nested.property('type')
      .and.to.deep.equals(Address);

    expect(fields).to.have.property('distance')
      .and.to.have.nested.property('type')
      .and.to.deep.equals(Distance);
  });

  it('Address Schema should have all expected fields of a type', () => {
    const fields = Address.getFields();
    const size = Object.keys(fields).length;

    expect(size).to.equal(9);

    expect(fields).to.have.property('w3w')
      .and.to.have.nested.property('type')
      .and.to.deep.equals(GraphQLString);

    expect(fields).to.have.property('postal')
      .and.to.have.nested.property('type')
      .and.to.deep.equals(GraphQLString);

    expect(fields).to.have.property('address')
      .and.to.have.nested.property('type')
      .and.to.deep.equals(GraphQLString);

    expect(fields).to.have.property('city')
      .and.to.have.nested.property('type')
      .and.to.deep.equals(GraphQLString);

    expect(fields).to.have.property('country')
      .and.to.have.nested.property('type')
      .and.to.deep.equals(GraphQLString);

    expect(fields).to.have.property('formatted_name')
      .and.to.have.nested.property('type')
      .and.to.deep.equals(GraphQLString);

    expect(fields).to.have.property('rpath')
      .and.to.have.nested.property('type');

    expect(fields).to.have.property('regions')
      .and.to.have.nested.property('type');
  });

  it('Region Schema should have all expected fields of a type', () => {
    const fields = Region.getFields();
    const size = Object.keys(fields).length;

    expect(size).to.equal(6);

    expect(fields).to.have.property('id')
      .and.to.have.nested.property('type')
      .and.to.deep.equals(GraphQLInt);

    expect(fields).to.have.property('name')
      .and.to.have.nested.property('type')
      .and.to.deep.equals(GraphQLString);

    expect(fields).to.have.property('admin_level')
      .and.to.have.nested.property('type')
      .and.to.deep.equals(GraphQLInt);

    expect(fields).to.have.property('url')
      .and.to.have.nested.property('type')
      .and.to.deep.equals(GraphQLString);

    expect(fields).to.have.property('path')
      .and.to.have.nested.property('type')
      .and.to.deep.equals(GraphQLString);

    expect(fields).to.have.property('bbox')
      .and.to.have.nested.property('type')
      .and.to.deep.equals(GeoJSONFeatureObject);
  });
});
