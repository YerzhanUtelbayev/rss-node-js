const UserNotFoundException = require('../../exceptions/UserNotFoundException');
const User = require('./user.model');

const create = async (userData) => {
  const userDoc = new User(userData);
  return await userDoc.save();
};

const getAll = async () => await User.find({});

const getById = async (userId) => await User.findById(userId);

const update = async (userId, userData) => {
  const userDoc = await User.findById(userId);
  if (!userDoc) {
    throw new UserNotFoundException(userId);
  }

  const { name, login, password } = userData;
  userDoc.name = name;
  userDoc.login = login;
  userDoc.password = password;
  return await userDoc.save();
};

const remove = async (userId) => await User.findByIdAndDelete(userId);

module.exports = { create, getAll, getById, update, remove };
