const e = require('express');
const { User, Thought } = require('../models');

module.exports = {
  getUsers(req, res) { // grabs all users
    User.find()
      .then((users) => res.json(users))
      .catch((err) => res.status(500).json(err));
  },

  getUser(req, res) { // grabs one user by ID
    User.findOne({ _id: req.params.userId })
      .select('-__v')
      .then((user) =>
        !user
          ? res.status(404).json({ message: 'No user with this ID found' })
          : res.json(user)
      )
      .catch((err) => res.status(500).json(err));
  },  

  createUser(req, res) { // create a new user
    User.create(req.body)
      .then((user) =>
        !user
          ? res.status(404).json({ message: 'User created.' })
          : res.json('User created!')
      )
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  },
  
  updateUser(req, res) { // create a new user
    User.findOneAndUpdate(
      { _id: req.params.userId },
      { $set: req.body },
    )
    .then((user) =>
      !user
        ? res.status(404).json({ message: 'No user with this id found.' })
        : res.json(user)
    )
    .catch((err) => res.status(500).json(err));
  },
  
  deleteUser(req, res) {  
    User.findOneAndDelete({ _id: req.params.userId })
      .then((user) =>
        !user
        ? res.status(404).json({ message: 'No user with this id found.' })
        : Thought.deleteMany({ _id: { $in: username.thoughts } })
      )
      .then(() => res.json({ message: 'User deleted.' }))
      .catch((err) => res.status(500).json(err));
  },
  
  addFriend(req, res) { 
    User.findOneAndUpdate(
      { _id: req.params.userId },
      { $push: { friends: req.params.friendId} },
      { runValidators: true, new: true },
    )
      .then((user) => 
        !user
        ? res.status(404).json({ message: 'No user with this id found.' })
        : res.json(user)
      )
      .catch((err) => res.status(500).json(err));    
  },
  
  deleteFriend(req, res) {
    User.findOneAndUpdate(
      { _id: req.params.userId },
      { $pull: { friends: { friendID: req.params.friendId}} },
    )
    .then((user) => 
      !user
      ? res.status(404).json({ message: 'No user with this id found.' })
      : res.json(user)
    )
    .catch((err) => res.status(500).json(err));    
  }
}