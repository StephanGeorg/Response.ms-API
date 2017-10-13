import express from 'express';
import cors from 'cors';

import auth from './features/auth/auth';
import configureGraphQL from './graphql';
import './db';

const app = express();
app.use(cors());
app.use(auth);
configureGraphQL(app);

app.get('/', (req, res) => {
  res.send('Welcome to Nearest! API. Send your requests to /graphql or use <a href="/graphql">GraphiQL</a>');
});

app.listen(process.env.PORT || 9001);
