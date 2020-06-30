const User = require('../models/User');
const cache = require('../middleware/cache');

module.exports = {
  getUsers: (req, res) => {
    User.find({}).exec(function (err, users) {
      if (err) {
        res.send({ status: 200, message: 'failed', ...err });
      } else {
        res.send({ status: 200, data: users });
      }
    });
  },
  getUser: (req, res) => {
    const id = req.params.id;
    const key = JSON.stringify(req.params);
    console.log(key);
    User.findOne({ _id: id }).exec(function (err, user) {
      if (err) {
        res.send({ status: 200, message: 'failed', ...err });
      } else {
        cache.saveToCache(key, user);
        res.send({ status: 200, message: 'success', data: user });
      }
    });
  },
  getUserByAccountNumber: (req, res) => {
    const accountNumber = req.params.accountNumber;
    const key = JSON.stringify(req.params);
    User.findOne({ accountNumber: accountNumber }).exec(function (err, user) {
      if (err) {
        res.send({ status: 200, message: 'failed', ...err });
      } else {
        cache.saveToCache(key, user);
        res.send({ status: 200, message: 'success', data: user });
      }
    });
  },
  getUserByIdentityNumber: (req, res) => {
    const identityNumber = req.params.identityNumber;
    const key = JSON.stringify(req.params);
    User.findOne({ identityNumber: identityNumber }).exec(function (err, user) {
      if (err) {
        res.send({ status: 200, message: 'failed', ...err });
      } else {
        cache.saveToCache(key, user);
        res.send({ status: 200, message: 'success', data: user });
      }
    });
  },
  createUser: (req, res) => {
    var user = new User(req.body);

    user.save(function (err, user) {
      if (err) {
        res.send({ status: 200, message: 'failed', ...err });
      } else {
        res.send({ status: 201, message: 'success', data: user });
      }
    });
  },
  deleteUser: (req, res) => {
    User.findOneAndDelete({ _id: req.params.id }).exec(function (err, user) {
      if (err) {
        res.send({ status: 200, message: 'failed', ...err });
      } else {
        res.send({ status: 200, message: 'success', data: user });
      }
    });
  },
  updateUser: (req, res) => {
    User.findByIdAndUpdate(
      req.params.id,
      {
        $set: {
          name: req.body.name,
          address: req.body.address,
          position: req.body.position,
          salary: req.body.salary
        }
      },
      { new: true },
      function (err, user) {
        if (err) {
          res.send({ status: 200, message: 'failed', ...err });
        } else {
          res.send({ status: 200, message: 'success', data: user });
        }
      }
    );
  }
};
