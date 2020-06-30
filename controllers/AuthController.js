const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

module.exports = {
  signIn: (req, res) => {
    User.findOne({ emailAddress: req.body.email }).exec(function (err, user) {
      if (user) {
        const checkLogin = bcrypt.compareSync(req.body.password, user.password);
        if (checkLogin) {
          var token = jwt.sign(
            { id: user.id, role: user.role },
            process.env.SECRET
          );
          if (token) {
            res.send({ status: 200, message: 'success', token: token });
          }
        } else {
          res.send({ status: 200, message: 'Invalid Email and Password' });
        }
      } else {
        res.send({ status: 404, message: 'Not Found' });
      }
    });
  }
};
