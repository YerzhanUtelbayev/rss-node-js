const boardRepo = require('./board.memory.repository');
const taskService = require('../tasks/task.service');

const create = (boardData) => boardRepo.create(boardData);

const getAll = () => boardRepo.getAll();

const getById = (boardId) => boardRepo.getById(boardId);

const update = (boardId, boardData) => boardRepo.update(boardId, boardData);

const remove = async (boardId) => {
  const tasks = await taskService.getByBoardId(boardId);
  if (tasks.length > 0) {
    tasks.forEach(({ id }) => taskService.remove(id));
  }

  return boardRepo.remove(boardId);
};

module.exports = { create, getAll, getById, update, remove };
