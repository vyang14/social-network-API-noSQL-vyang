const { Schema, model } = require('mongoose');
const reactionSchema = require('./Reaction');

const thoughtSchema = new Schema(
  {
    thoughtText: {
      type: String,
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
        type: String,
        required: true,
      },
    reactions: [reactionSchema],
  },
  {
    toJSON: {
      virtuals: true,
    },
    id: false,
  }
);

// Virtual that gets the amount of reactions per user
thoughtSchema.virtual('reactionCount').get(function () { 
  return this.reactions.length; 
});

const Thought = model('thought', thoughtSchema);

module.exports = Thought;