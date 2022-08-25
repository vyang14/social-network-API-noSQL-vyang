const { Schema, model } = require('mongoose');

// Schema to create Post model
const thoughtSchema = new Schema(
  {
    published: {
      type: Boolean,
      default: false,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    users: [
      {
        type: Schema.Types.ObjectId,
        ref: 'user',
      },
    ],
    text: {
      type: String,
      minLength: 15,
      maxLength: 500,
    },
  },
  {
    toJSON: {
      virtuals: true,
    },
    id: false,
  }
);

// Virtual `userCount` that gets the amount of comments per user
thoughtSchema.virtual('userCount').get(function () { 
  return this.users.length; 
});

// Initialize Post model
const Thought = model('thought', thoughtSchema);

module.exports = Post;
