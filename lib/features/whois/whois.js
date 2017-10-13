import { _ } from 'lodash';

const whoisParser = require('parse-whois');
const whois = require('node-whois');

const parser = (result) => {
  const whoisData = whoisParser.parseWhoIsData(result);
  return {
    netname:
      _.get(_.find(whoisData, { attribute: 'NetName' }), 'value') ||
      _.get(_.find(whoisData, { attribute: 'netname' }), 'value'),
    country:
      _.get(_.find(whoisData, { attribute: 'country' }), 'value') ||
      _.get(_.find(whoisData, { attribute: 'Country' }), 'value'),
    organization:
      _.get(_.find(whoisData, { attribute: 'Organization' }), 'value') ||
      _.get(_.find(whoisData, { attribute: 'organization' }), 'value') ||
      _.get(_.find(whoisData, { attribute: 'role' }), 'value') ||
      _.get(_.find(whoisData, { attribute: 'descr' }), 'value'),
  };
};

export default address =>
  new Promise((resolve, reject) => {
    whois.lookup(address, (err, data) => {
      if (err) reject(err);
      if (data) resolve(parser(data));
    });
  });
