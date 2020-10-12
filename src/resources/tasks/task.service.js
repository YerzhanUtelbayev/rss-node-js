const taskRepo = require('./task.memory.repository');

const create = (taskData) => taskRepo.create(taskData);

const getByBoardId = (boardId) => taskRepo.getByBoardId(boardId);

const getById = (taskId) => taskRepo.getById(taskId);

const remove = (taskId) => taskRepo.remove(taskId);

module.exports = { create, getByBoardId, getById, remove };
