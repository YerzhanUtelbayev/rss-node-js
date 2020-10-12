const userRepo = require('./user.memory.repository');

const create = (userData) => userRepo.create(userData);

const getAll = () => userRepo.getAll();

const getById = (userId) => userRepo.getById(userId);

const update = (userId, userData) => userRepo.update(userId, userData);

const remove = (userId) => userRepo.remove(userId);

module.exports = { create, getAll, getById, update, remove };
