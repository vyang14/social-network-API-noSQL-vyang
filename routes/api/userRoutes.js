const router = require('express').Router();

const {
  getUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser,
  addFriend,
  deleteFriend,
} = require('../../controllers/userController'); // object importing all methods being imported from userController

router.route('/').get(getUsers).post(createUser); //api route for users

router.route('/:userId').get(getUser).put(updateUser).delete(deleteUser); // api route for a single user by ID

router.route('/:userId/friend/:friendId').post(addFriend).delete(deleteFriend); // api route to add and delete friends

module.exports = router;