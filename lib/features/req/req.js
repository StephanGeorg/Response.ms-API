import request from 'request';


export default async url =>
  new Promise((resolve, reject) => {
    request({
      uri: url,
      time: true,
      timingPhases: true,
      method: 'GET',
      rejectUnauthorized: false,
    }, (error, response) => {
      if (error) reject(error);
      if (response) {
        const { timingStart, timings, timingPhases } = response;
        resolve({
          request: {
            time: {
              timingStart,
              timings,
              timingPhases,
            },
          },
        });
      }
    });
  });
