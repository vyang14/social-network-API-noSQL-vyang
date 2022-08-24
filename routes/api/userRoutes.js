const router = require('express').Router();

const {
  getUsers,
  getSingleUser,
  createUser,
  updateUser,
  deleteUser,
  addFriend,
  deleteFriend,
} = require('../../controllers/userController'); // object containing all methods being imported from userController

router.route('/').get(getUsers).post(createUser); //api route for users

router.route('/:userId').get(getSingleUser).put(updateUser).delete(deleteUser); // api route for a single user by ID

router.route('/:userId/friend/:friendID').post(addFriend).delete(deleteFriend); // api route to add and delete friends


module.exports = router;
