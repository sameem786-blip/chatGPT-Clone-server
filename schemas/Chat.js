const mongoose = require('mongoose');

const chatSchema = new mongoose.Schema({
  prompt: {
    type: String,
    required: true,
  },
  response: {
    type: String,
    required: true,
  },
    timeStamp: {
        type: Date,
        required: true,
        default: Date.now
    },
    like: {
        type: Boolean,
        default: false,
    },
    dislike: {
        type: Boolean,
        default: false
    },
    groupId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'ChatGroup',
      required: true
    },

  // Add other fields as needed for your user schema
});

const Chat = mongoose.model('Chat', chatSchema);

module.exports = Chat;