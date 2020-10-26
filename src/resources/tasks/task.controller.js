const taskMapper = require('./task.mapper');
const taskService = require('./task.service');
const TaskNotFoundException = require('../../exceptions/TaskNotFoundException');
const EntityNotSavedException = require('../../exceptions/EntityNotSavedException');

const getAll = async (request, response) => {
  const { boardId } = request.params;
  const tasks = await taskService.getByBoardId(boardId);
  return response.json(tasks.map(taskMapper.toResponse));
};

const create = async (request, response) => {
  const {
    params: { boardId },
    body
  } = request;

  const taskData = taskMapper.mapRequest(body);

  const result = await taskService.create({ ...taskData, boardId });
  if (!result) {
    throw new EntityNotSavedException();
  }
  return response.json(taskMapper.toResponse(result));
};

const getById = async (request, response) => {
  const { taskId } = request.params;
  const result = await taskService.getById(taskId);
  if (!result) {
    throw new TaskNotFoundException(taskId);
  }

  return response.json(taskMapper.toResponse(result));
};

const update = async (request, response) => {
  const {
    params: { taskId },
    body
  } = request;
  const taskData = taskMapper.mapRequest(body);

  const result = await taskService.update(taskId, taskData);
  if (!result) {
    throw new EntityNotSavedException();
  }
  return response.json(taskMapper.toResponse(result));
};

const remove = async (request, response) => {
  const { taskId } = request.params;
  const result = await taskService.remove(taskId);
  if (!result) {
    throw new TaskNotFoundException(taskId);
  }
  return response.sendStatus(204);
};

module.exports = { getAll, create, getById, update, remove };
