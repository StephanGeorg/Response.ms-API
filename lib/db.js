import ee from 'event-emitter';

const { MongoClient } = require('mongodb');

const emitter = ee();

const mongoDatabaseUrl = 'mongodb://nearest:8S0DaM51XMTKhmjdt6@db1.nearest.place:27017,db2.nearest.place:27017/nearest?replicaSet=rs0';

let db;
MongoClient.connect(mongoDatabaseUrl, (mongoErr, dbInstance) => {
  if (mongoErr) {
    throw new Error(mongoErr);
  }
  db = dbInstance;
  emitter.emit('connected');
});

export default function useDb() {
  return new Promise((resolve) => {
    if (!db) {
      emitter.on('connected', () => {
        resolve(db);
      });
    } else {
      // TODO: Check if the connection is lost. If so we will resolve
      // on the event of "reconnected"
      resolve(db);
    }
  });
}
