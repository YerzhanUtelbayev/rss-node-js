const boardRepo = require('./board.mongodb.repository');
const taskService = require('../tasks/task.service');

const create = (boardData) => boardRepo.create(boardData);

const getAll = () => boardRepo.getAll();

const getById = (boardId) => boardRepo.getById(boardId);

const update = (boardId, boardData) => boardRepo.update(boardId, boardData);

const remove = async (boardId) => {
  const result = await boardRepo.remove(boardId);
  taskService.removeByBoardId(boardId);
  return result;
};

module.exports = { create, getAll, getById, update, remove };
