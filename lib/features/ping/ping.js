import ping from 'tcp-ping';

export default async address =>
  new Promise((resolve, reject) => {
    ping.ping({
      address,
    }, (err, data) => {
      if (err) reject(err);
      if (data) {
        resolve({
          ping: data,
        });
      }
    });
  });
