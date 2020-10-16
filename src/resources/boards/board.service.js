const boardRepo = require('./board.memory.repository');
const taskService = require('../tasks/task.service');

const create = (boardData) => boardRepo.create(boardData);

const getAll = () => boardRepo.getAll();

const getById = (boardId) => boardRepo.getById(boardId);

const update = (boardId, boardData) => boardRepo.update(boardId, boardData);

const removeLinkedTasks = async (boardId) => {
  const tasks = await taskService.getByBoardId(boardId);
  tasks.forEach(({ id }) => taskService.remove(id));
};

const remove = (boardId) => {
  removeLinkedTasks(boardId);
  return boardRepo.remove(boardId);
};

module.exports = { create, getAll, getById, update, remove };
