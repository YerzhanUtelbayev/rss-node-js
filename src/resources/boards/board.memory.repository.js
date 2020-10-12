const boardDb = require('./board.db');

const create = async (boardData) => boardDb.create(boardData);

const getAll = async () => boardDb.findAll();

const getById = async (boardId) => boardDb.findById(boardId);

const update = async (boardId, boardData) =>
  boardDb.updateOne(boardId, boardData);

const remove = async (boardId) => boardDb.remove(boardId);

module.exports = { create, getAll, getById, update, remove };
