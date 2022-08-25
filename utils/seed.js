const connection = require('../config/connection');
const { Thought, Users } = require('../models');
// Import functions for seed data
const { getRandomColor, getRandomThought, genRandomIndex } = require('./data');

// Start the seeding runtime timer
console.time('seeding');

// Creates a connection to mongodb
connection.once('open', async () => {
  // Delete the entries in the collection
  await Thought.deleteMany({});
  await Users.deleteMany({});

  // Empty arrays for randomly generated thoughts and users
  const users = [];
  const thoughts = [];

  // Function to make a thought object and push it into the thoughts array
  const makeThought = (text) => {
    thoughts.push({
      published: Math.random() < 0.5,
      text,
      users: [users[genRandomIndex(users)]._id],
    });
  };

  // Create 20 random users and push them into the users array
  for (let i = 0; i < 20; i++) {
    const username = getRandomColor();

    users.push({
      username,
      color: username,
    });
  }

  // Wait for the users to be inserted into the database
  await Users.collection.insertMany(users);

  // For each of the users that exist, make a random thought of length 50
  users.forEach(() => makeThought(getRandomThought(50)));

  // Wait for the thoughts array to be inserted into the database
  await Thought.collection.insertMany(thoughts);

  // Log out a pretty table for users and thoughts, excluding the excessively long text property
  console.table(users);
  console.table(thoughts, ['published', 'users', '_id']);
  console.timeEnd('seeding');
  process.exit(0);
});
