const mongoose = require('mongoose');

const { Schema, model } = mongoose;

const TaskSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  order: {
    type: Number,
    min: 0,
    max: 100,
    default: 0
  },
  description: {
    type: String
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  boardId: {
    type: Schema.Types.ObjectId,
    ref: 'Board',
    required: true
  },
  columnId: {
    type: Schema.Types.ObjectId,
    ref: 'Board.columns'
  }
});

const Task = model('Task', TaskSchema);

module.exports = Task;
