const router = require('express').Router();
const {
  getUsers,
  getUser,
  getUserByAccountNumber,
  getUserByIdentityNumber,
  createUser,
  deleteUser,
  updateUser
} = require('../controllers/UserController');
const auth = require('../middleware/auth');
const cache = require('../middleware/cache');

router.get('/', auth.isAuthorized, getUsers);
router.get('/:id', cache.checkCache, getUser);
router.get(
  '/account-number/:accountNumber',
  cache.checkCache,
  getUserByAccountNumber
);
router.get(
  '/identity-number/:identityNumber',
  cache.checkCache,
  getUserByIdentityNumber
);
router.post('/', auth.isAuthorized, createUser);
router.delete('/:id', auth.isAuthorized, deleteUser);
router.put('/:id', auth.isAuthorized, updateUser);

module.exports = router;
