const { User, Thought } = require('../models');

module.exports = {
  getUsers(req, res) { // grabs all users
    User.find({})
      .select('-__v')
      .then((user) => res.json(user))
      .catch((err) => res.status(500).json(err));
  },
  getSingleUser(req, res) { // grabs one user by ID
    User.findOne({ _id: req.params.userId })
      .select('-__v')
      .then((user) =>
        !user
          ? res.status(404).json({ message: 'No user with that ID' })
          : res.json(user)
      )
      .catch((err) => res.status(500).json(err));
  },
  
  createUser(req, res) { // create a new user
    User.create(req.body)
      .then((user) => {
        return Thought.findOneAndUpdate(
          { _id: req.body.postId },
          { $addToSet: { users: user._id } },
          { new: true }
        );
      })
      .then((user) =>
        !user
          ? res
              .status(404)
              .json({ message: 'User created, but found no post with that ID' })
          : res.json('Created the user 🎉')
      )
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  },
};
