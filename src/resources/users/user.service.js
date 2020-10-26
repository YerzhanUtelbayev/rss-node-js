const userRepo = require('./user.mongodb.repository');
const tasksService = require('../tasks/task.service');

const create = (userData) => userRepo.create(userData);

const getAll = () => userRepo.getAll();

const getById = (userId) => userRepo.getById(userId);

const update = (userId, userData) => userRepo.update(userId, userData);

const remove = async (userId) => {
  const result = await userRepo.remove(userId);
  tasksService.unassignUsersTasks(userId);
  return result;
};

module.exports = { create, getAll, getById, update, remove };
