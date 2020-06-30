const redis = require('redis');

const redis_client = redis.createClient(process.env.CACHE);

module.exports = {
  checkCache: (req, res, next) => {
    const key = JSON.stringify(req.params);

    redis_client.get(key, (err, data) => {
      if (err) {
        res.status(500).send(err);
      }
      if (data != null) {
        res.send({ status: 200, message: 'success', data: JSON.parse(data) });
      } else {
        next();
      }
    });
  },
  saveToCache: (key, data) => {
    redis_client.setex(key, 3600, JSON.stringify(data));
  }
};
