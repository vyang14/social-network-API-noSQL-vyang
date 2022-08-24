const { Schema, model } = require('mongoose');

const userSchema = new Schema(
  {
    userName: {
      type: String,
      required: true,
    },
    color: {
      type: String,
      default: '#008080',
    },
    createdAt: Date,
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
