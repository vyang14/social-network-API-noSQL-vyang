const { Schema, model } = require('mongoose');

const userSchema = new Schema(
  {
    id: {
      type: String,
      required: true,
      unique: true,
    },
    reaction: {
      type: String,
      required: true,
      unique: true,
      match: [
        /^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/,
        'Invalid email address format.'
      ]
    },
    user: [
      {
      type: String,
      ref: 'thoughts',
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
  }
);

userSchema.virtual('getUserCss').get(function () {
      return `color: ${this.color}`;
  });

const User = model('user', userSchema);

module.exports = User;
