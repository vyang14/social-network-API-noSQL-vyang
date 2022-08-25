const { Schema, model } = require('mongoose');

const userSchema = new Schema(
  {
    userName: {
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
  },
  {
    toJSON: {
      virtuals: true,
    },
  }
);

userSchema
  .virtual('getUserCss')
  // Getter
  .get(function () {
    return `color: ${this.color}`;
  });

const User = model('user', userSchema);

module.exports = User;
