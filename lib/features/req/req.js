import request from 'request';
import isHttp2 from 'is-http2';
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
      openssl: '/usr/local/Cellar/openssl/1.0.2k/bin/openssl',
    }),
  ];

  return new Promise((resolve, reject) => {
    Promise.all(jobs)
      .then((data) => {
        const requestData = data[0];
        const ishttp2 = data[1];
        requestData.request.protocol = ishttp2;
        resolve(requestData);
      })
      .catch(reject);
  });
};
