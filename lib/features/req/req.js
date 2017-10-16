import request from 'request';
import isHttp2 from 'is-http2';
import httpstat from 'httpstat';
import Url from 'url';

const parse = (response) => {
  const { statusCode, headers, connection } = response;
  const { timingStart, timings, timingPhases } = response;
  const { server } = headers;
  const { encrypted } = connection;
  const transferEnconding = headers['transfer-encoding'];
  const contentType = headers['content-type'];
  const contentLength = headers['content-length'];
  const contentEncoding = headers['content-encoding'];
  return {
    request: {
      statusCode,
      server,
      encrypted,
      transferEnconding,
      content: {
        contentType,
        contentLength,
        contentEncoding,
      },
      time: {
        timingStart,
        timings,
        timingPhases,
      },
    },
  };
};

const parseHttpstat = (httpstatResult) => {
  const { time, response } = httpstatResult;
  const { connection } = response;
  const { encrypted } = connection;
  const result = {
    dns: (time.onLookup - time.begin),
    tcp: (time.onConnect - time.onLookup),
  };
  if (encrypted) result.ssl = (time.onSecureConnect - time.onConnect);
  if (encrypted) result.server = (time.onTransfer - time.onSecureConnect);
  else result.server = (time.onTransfer - time.onConnect);
  result.transfer = (time.onTotal - time.onTransfer);
  result.total = (time.onTotal - time.begin);
  return result;
};

const req = url =>
  new Promise((resolve, reject) => {
    request({
      uri: url,
      time: true,
      timingPhases: true,
      method: 'GET',
      rejectUnauthorized: false,
    }, (error, response) => {
      if (error) reject(error);
      if (response) resolve(parse(response));
    });
  });


export default async (addr) => {
  const url = Url.parse(addr, true);
  const jobs = [
    req(url),
    isHttp2(`${url.protocol}//${url.host}`, {
      includeSpdy: true,
      // openssl: '/usr/local/Cellar/openssl/1.0.2k/bin/openssl',
    }),
    httpstat(url.href, { rejectUnauthorized: false }, ['Accept-Encoding: gzip,deflate']),
  ];

  return new Promise((resolve, reject) => {
    Promise.all(jobs)
      .then((data) => {
        const requestData = data[0];
        const ishttp2 = data[1];
        const stat = parseHttpstat(data[2]);
        requestData.request.protocol = ishttp2;
        requestData.request.httpstat = stat;
        resolve(requestData);
      })
      .catch(reject);
  });
};
