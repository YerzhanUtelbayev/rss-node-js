const userRepo = require('./user.memory.repository');
const tasksService = require('../tasks/task.service');

const create = (userData) => userRepo.create(userData);

const getAll = () => userRepo.getAll();

const getById = (userId) => userRepo.getById(userId);

const update = (userId, userData) => userRepo.update(userId, userData);

const unassignUserTasks = async (userId) => {
  const tasks = await tasksService.getByUserId(userId);
  tasks.forEach(({ id }) => tasksService.update(id, { userId: null }));
};

const remove = (userId) => {
  unassignUserTasks(userId);
  return userRepo.remove(userId);
};

module.exports = { create, getAll, getById, update, remove };
