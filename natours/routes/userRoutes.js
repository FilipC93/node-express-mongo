const express = require('express');
const {
  getAllUsers,
  getSingleUser,
  updateUser,
  createUser,
  deleteUser,
} = require('../controllers/userController');

const router = express.Router();
router.route('/').get(getAllUsers).post(createUser);
router.route('/:id').get(getSingleUser).patch(updateUser).delete(deleteUser);

module.exports = router;
