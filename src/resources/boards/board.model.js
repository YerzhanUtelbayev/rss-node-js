const mongoose = require('mongoose');

const { Schema, model } = mongoose;

const ColumnSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  order: {
    type: String
  }
});

const BoardSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  columns: ColumnSchema
});

const Board = model('Board', BoardSchema);

module.exports = Board;
