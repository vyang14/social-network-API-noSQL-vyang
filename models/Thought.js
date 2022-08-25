const { Schema, model } = require('mongoose');

// Schema to create Post model
const thoughtSchema = new Schema(
  {
    thoughtText: {
      type: Boolean,
      required: true,
      minLength: 1,
      maxLength: 280,
    },
    createdAt: {
      type: Date,
      default: Date.now,
      get: () => Date.now,
    },
    username: {
        type: Schema.Types.ObjectId,
        ref: 'user',
      },
    reactions: {
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

// Virtual that gets the amount of comments per user
thoughtSchema.virtual('reactionCount').get(function () { 
  return this.reactions.length; 
});

const Thought = model('thought', thoughtSchema);

module.exports = Post;
