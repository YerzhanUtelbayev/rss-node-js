const taskDb = require('./task.db');

const create = async (taskData) => taskDb.create(taskData);

const getByBoardId = async (boardId) => taskDb.findByBoardId(boardId);

const getById = async (taskId) => taskDb.findById(taskId);

const update = async (taskId, taskData) => taskDb.updateOne(taskId, taskData);

const remove = async (taskId) => taskDb.remove(taskId);

module.exports = { create, getByBoardId, getById, update, remove };
