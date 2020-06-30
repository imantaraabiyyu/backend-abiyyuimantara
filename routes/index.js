const router = require('express').Router();
const users = require('./users');
const { signIn } = require('../controllers/AuthController');
const auth = require('../middleware/auth');

router.post('/signin', signIn);
router.use('/users', auth.isAuth, users);

module.exports = router;
