const { Schema, model } = require('mongoose');

const reactionSchema = new Schema(
  {
    reactionId: {
      type: Schema.Types.ObjectId,
      default: () => new Types.ObjectId(),
    },
    reactionBody: {
      type: String,
      required: true,
      minLength: 1,
      maxLength: 280,
    },
    username: {
      type: String,
      required: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
      get: () => Date.now,
    },
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
