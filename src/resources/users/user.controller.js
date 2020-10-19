const User = require('./user.model');
const userService = require('./user.service');
const UserNotFoundException = require('../../exceptions/UserNotFoundException');

const getAll = async (request, response) => {
  const users = await userService.getAll();
  return response.json(users.map(User.toResponse));
};

const create = async (request, response) => {
  const { body } = request;
  const userData = User.mapRequest(body);

  const result = await userService.create(userData);
  if (!result) {
    return response.sendStatus(400);
  }
  return response.json(User.toResponse(result));
};

const getById = async (request, response, next) => {
  const {
    params: { userId }
  } = request;

  const result = await userService.getById(userId);
  if (!result) {
    return next(new UserNotFoundException(userId));
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
    return response.sendStatus(400);
  }
  return response.json(User.toResponse(result));
};

const remove = async (request, response, next) => {
  const {
    params: { userId }
  } = request;

  const result = await userService.remove(userId);
  if (!result) {
    return next(new UserNotFoundException(userId));
  }
  return response.sendStatus(204);
};

module.exports = { getAll, create, getById, update, remove };
