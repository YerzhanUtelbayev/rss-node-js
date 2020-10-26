const taskRepo = require('./task.mongodb.repository');

const create = (taskData) => taskRepo.create(taskData);

const getByBoardId = (boardId) => taskRepo.getByBoardId(boardId);

const getById = (taskId) => taskRepo.getById(taskId);

const update = (taskId, taskData) => taskRepo.update(taskId, taskData);

const remove = (taskId) => taskRepo.remove(taskId);

const removeByBoardId = (boardId) => taskRepo.removeByBoardId(boardId);

const unassignUsersTasks = (userId) =>
  taskRepo.updateMany({ userId }, { userId: null });

module.exports = {
  create,
  getByBoardId,
  getById,
  update,
  remove,
  removeByBoardId,
  unassignUsersTasks
};
