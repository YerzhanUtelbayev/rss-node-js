const boardDb = require('./board.db');
const taskDb = require('../tasks/task.db');

const create = async (boardData) => boardDb.create(boardData);

const getAll = async () => boardDb.findAll();

const getById = async (boardId) => boardDb.findById(boardId);

const update = async (boardId, boardData) =>
  boardDb.updateOne(boardId, boardData);

const remove = async (boardId) => {
  const tasks = taskDb.findByBoardId(boardId);
  if (tasks.length > 0) {
    tasks.forEach(({ id }) => taskDb.remove(id));
  }
  return boardDb.remove(boardId);
};

module.exports = { create, getAll, getById, update, remove };
