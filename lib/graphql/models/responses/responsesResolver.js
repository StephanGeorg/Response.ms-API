import { _ } from 'lodash';
import Url from 'url';

import useDb from '../../../db';
import {
  COLLECTION_NODES,
  COLLECTION_CACHE,
} from '../../../globals';

import dns from '../../../features/dns/dns';
import req from '../../../features/req/req';
import ping from '../../../features/ping/ping';



export async function get(source, { url }) {
  const uri = Url.parse(url);
  const jobs = [
    dns(url),
    req(url),
    ping(uri.host),
  ];
  return Promise.all(jobs);
}

export async function getDns(url) {
  const lookup = await dns(url);
  return lookup;
}

export async function getRequest(url) {
  const response = await req(url);
  return response;
}

export async function getPing(url) {
  const tcping = await ping(url);
  return tcping;
}
