const Task = require('./task.model');
const taskService = require('./task.service');
const TaskNotFoundException = require('../../exceptions/TaskNotFoundException');

const getAll = async (request, response) => {
  const { boardId } = request.params;
  const tasks = await taskService.getByBoardId(boardId);
  return response.json(tasks);
};

const create = async (request, response) => {
  const { boardId } = request.params;
  const { body } = request;

  const taskData = Task.mapRequest(body);

  const result = await taskService.create({ ...taskData, boardId });
  if (!result) {
    return response.sendStatus(400);
  }
  return response.json(result);
};

const getById = async (request, response, next) => {
  const { taskId } = request.params;
  const result = await taskService.getById(taskId);
  if (!result) {
    return next(new TaskNotFoundException(taskId));
  }

  return response.json(result);
};

const update = async (request, response) => {
  const { taskId } = request.params;
  const taskData = Task.mapRequest(request.body);

  const result = await taskService.update(taskId, taskData);

  if (!result) {
    return response.sendStatus(400);
  }

  return response.json(result);
};

const remove = async (request, response, next) => {
  const { taskId } = request.params;
  const result = await taskService.remove(taskId);
  if (!result) {
    return next(new TaskNotFoundException(taskId));
  }
  return response.sendStatus(204);
};

module.exports = { getAll, create, getById, update, remove };
