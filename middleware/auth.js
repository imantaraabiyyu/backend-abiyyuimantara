const jwt = require('jsonwebtoken');

module.exports = {
  isAuth: (req, res, next) => {
    try {
      const token = req.headers.authorization;
      var decoded = jwt.verify(token, process.env.SECRET);
      req.user = decoded;
      next();
    } catch (err) {
      res
        .status(401)
        .send({ status: 401, message: 'failed', errors: err.message });
    }
  },
  isAuthorized: (req, res, next) => {
    if (req.user.role == 'admin') {
      next();
    } else {
      res.status(401).send({
        status: 401,
        message: 'failed',
        errors: 'User not Authorized'
      });
    }
  }
};
