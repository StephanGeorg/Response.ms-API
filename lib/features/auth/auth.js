import keys from './keys';

export default function (req, res, next) {
  const apiKey = req.header('x-apikey') || '';
  if (req.method === 'POST' && !keys.includes(apiKey)) {
    const msg = (!apiKey) ? 'API key missing' : 'API key invalid';
    const referer = req.header('Referer') || '';
    const host = req.header('Host');
    if (!referer.includes(`${host}/graphql`)) {
      res.status(403);
      res.json({ error: msg });
      return;
    }
  }
  next();
}
