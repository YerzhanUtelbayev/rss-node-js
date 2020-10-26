const User = require('./user.mapper');
const userService = require('./user.service');
const UserNotFoundException = require('../../exceptions/UserNotFoundException');
const EntityNotSavedException = require('../../exceptions/EntityNotSavedException');

const getAll = async (request, response) => {
  const users = await userService.getAll();
  return response.json(users.map(User.toResponse));
};

const create = async (request, response) => {
  const { body } = request;
  const userData = User.mapRequest(body);

  const result = await userService.create(userData);
  if (!result) {
    throw new EntityNotSavedException();
  }
  return response.json(User.toResponse(result));
};

const getById = async (request, response) => {
  const {
    params: { userId }
  } = request;

  const result = await userService.getById(userId);
  if (!result) {
    throw new UserNotFoundException(userId);
  }
  return response.json(User.toResponse(result));
};

const update = async (request, response) => {
  const {
    params: { userId },
    body
  } = request;
  const userData = User.mapRequest(body);

  const result = await userService.update(userId, userData);
  if (!result) {
    throw new EntityNotSavedException();
  }
  return response.json(User.toResponse(result));
};

const remove = async (request, response) => {
  const {
    params: { userId }
  } = request;

  const result = await userService.remove(userId);
  if (!result) {
    throw new UserNotFoundException(userId);
  }
  return response.sendStatus(204);
};

module.exports = { getAll, create, getById, update, remove };
