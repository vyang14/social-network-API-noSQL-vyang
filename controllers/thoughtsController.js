const { Thought } = require('../models');

module.exports = {
  getThoughts(req, res) { // get all thoughts
    Thought.find()
      .populate({ path: 'thought', select: '-__v' })
      .then((thoughts) => res.json(thoughts))
      .catch((err) => {
        console.error({ message: err });
        return res.status(500).json(err);
      });
  },

  getThought(req, res) { // get a single thought by ID
    Thought.findOne({ _id: req.params.thoughtId })
      .populate({ path: 'thought', select: '-__v' })
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


  updateThought(req, res) {
    Thought.findOneAndUpdate(
      { _id: req.params.thoughtId },
      { $set: req.body },
    )
    .then((thought) =>
      !thought
        ? res.status(404).json({ message: 'No thought with this id found.' })
        : res.json(thought)
    )
    .catch((err) => res.status(500).json(err));
  },
  
  deleteThought(req, res) {  
    Thought.findOneAndDelete({ _id: req.params.thoughtId })
      .then((thought) =>
        !thought
        ? res.status(404).json({ message: 'No thought with this id found.' })
        : Thought.deleteMany({ _id: { $in: thoughtname.thoughts } })
      )
      .then(() => res.json({ message: 'Thought deleted.' }))
      .catch((err) => res.status(500).json(err));
  },
  
  createReaction(req, res) { 
    Thought.findOneAndUpdate(
      { _id: req.params.thoughtId },
      { $addToSet: { reactions: req.params.reactionId} },
    )
      .then((thought) => 
        !thought
        ? res.status(404).json({ message: 'No thought with this id found.' })
        : res.json(thought)
      )
      .catch((err) => res.status(500).json(err));    
  },
  
  deleteReaction(req, res) {
    Thought.findOneAndUpdate(
      { _id: req.params.thoughtId },
      { $pull: { reactions: { reactionID: req.params.reactionId}} },
    )
    .then((thought) => 
      !thought
      ? res.status(404).json({ message: 'No thought with this id found.' })
      : res.json(thought)
    )
    .catch((err) => res.status(500).json(err));    
  }
};