const userDb = require('./user.db');

const create = async (userData) => userDb.create(userData);

const getAll = async () => userDb.findAll();

const getById = async (userId) => userDb.findById(userId);

const update = async (userId, userData) => userDb.updateOne(userId, userData);

const remove = async (userId) => userDb.remove(userId);

module.exports = { create, getAll, getById, update, remove };
