const userDb = require('./user.db');
const taskDb = require('../tasks/task.db');

const create = async (userData) => userDb.create(userData);

const getAll = async () => userDb.findAll();

const getById = async (userId) => userDb.findById(userId);

const update = async (userId, userData) => userDb.updateOne(userId, userData);

const remove = async (userId) => {
  const tasks = taskDb.findByUserId(userId);
  if (tasks.length > 0) {
    tasks.forEach(({ id }) => taskDb.updateOne(id, { userId: null }));
  }
  return userDb.remove(userId);
};

module.exports = { create, getAll, getById, update, remove };
