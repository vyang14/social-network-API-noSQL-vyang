const router = require('express').Router();

const {
  getThoughts,
  getThought,
  createThought,
  updateThought,
  deleteThought,
  createReaction,
  deleteReaction,
} = require('../../controllers/thoughtsController'); // object containing all methods being imported from userController

router.route('/').get(getThoughts).post(createThought); //api route for thoughts

router.route('/:thoughtId').get(getThought).put(updateThought).delete(deleteThought); // api route for a single thought by ID

router.route('/:userId/reaction/:reactionID').post(createReaction).delete(deleteReaction); // api route to add and delete reactions
module.exports = router;
