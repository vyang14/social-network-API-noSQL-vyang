const router = require('express').Router();

const {
  getThoughts,
  getThought,
  createThought,
  updateThought,
  deleteThought,
  createReaction,
  deleteReaction,
} = require('../../controllers/thoughtController'); // object importing all methods being imported from thoughtsController

router.route('/').get(getThoughts).post(createThought); //api route for thoughts

router.route('/:thoughtId').get(getThought).put(updateThought).delete(deleteThought); // api route for a single thought by ID

router.route('/:thoughtId/reactions').post(createReaction); // api route to create reactions

router.route('/:thoughtId/reactions/:reactionId').delete(deleteReaction); // api route to delete reactions

module.exports = router;