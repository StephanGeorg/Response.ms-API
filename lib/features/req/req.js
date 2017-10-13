import request from 'request';


export default async url =>
  new Promise((resolve, reject) => {
    request({
      uri: url,
      time: true,
      timingPhases: true,
      method: 'GET',
    }, (error, response) => {
      if (error) reject(error);
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
    });
  });
