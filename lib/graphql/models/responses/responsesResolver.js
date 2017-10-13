import { _ } from 'lodash';

import useDb from '../../../db';
import {
  COLLECTION_NODES,
  COLLECTION_CACHE,
} from '../../../globals';

import dns from '../../../features/dns/dns';
import req from '../../../features/req/req';

/**
 * Get nodes by its IDs
 */
export async function getNodeById(source, { app, id }) {
  // get db instance
  const db = await useDb();
  const ids = (_.isArray(id)) ? id : [id];
  return db.collection(COLLECTION_NODES).find({
    app,
    _id: { $in: ids },
  }).toArray();
}

export async function get(source, { url }) {
  const jobs = [
    dns(url),
    req(url),
  ];
  // const dnsData = await dns(url);
  return Promise.all(jobs);
}
