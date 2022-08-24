const { Thought } = require('../models');

module.exports = {
  getThoughts(req, res) { // get all thoughts
    Thought.find()
      .populate({ path: 'user', select: '-__v' })
      .then((thoughts) => res.json(thoughts))
      .catch((err) => {
        console.error({ message: err });
        return res.status(500).json(err);
      });
  },
  getSingleThought(req, res) { // get a single thought by ID
    Thought.findOne({ _id: req.params.thoughtId })
      .populate({ path: 'user', select: '-__v' })
      .then((thought) =>
        !thought
          ? res.status(404).json({ message: 'No thought with that ID' })
          : res.json(thought)
      )
      .catch((err) => res.status(500).json(err));
  },
  
  createThought(req, res) { // create a new thought
    Thought.create(req.body)
      .then((thought) => res.json(thought))
      .catch((err) => res.status(500).json(err));
  },
};
