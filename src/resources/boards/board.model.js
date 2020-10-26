const mongoose = require('mongoose');

const { Schema, model } = mongoose;

const ColumnSchema = new Schema({
  _id: {
    type: Schema.Types.ObjectId
  },
  title: {
    type: String,
    required: true
  },
  order: {
    type: Number,
    min: 1,
    default: 1
  }
});

const BoardSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  columns: [ColumnSchema]
});

const Board = model('Board', BoardSchema);

module.exports = Board;
