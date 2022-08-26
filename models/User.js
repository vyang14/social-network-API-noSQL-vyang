const { Schema, model } = require('mongoose');

const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      match: [
        /^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/,
        'Invalid email address format.'
      ]
    },
    thoughts: [
      {
      type: Schema.Types.ObjectID,
      ref: 'thought',
      },
    ],
    friends: [
      {
        type: Schema.Types.ObjectId,
        ref: 'user',
      },
    ],
  },
  {
    toJSON: {
      virtuals: true,
    },
    id: false,
  }
);

// Virtual to obtain the number of friends for a user
userSchema.virtual('friendCount').get(function () {
      return this.friends.length;
  });

const User = model('user', userSchema);

module.exports = User;