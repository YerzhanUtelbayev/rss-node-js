const router = require('express').Router({ mergeParams: true });

const Task = require('./task.model');
const taskService = require('./task.service');
const HttpException = require('../../exceptions/HttpException');
const TaskNotFoundException = require('../../exceptions/TaskNotFoundException');

router.route('/').get(async (req, res) => {
  const { boardId } = req.params;
  const tasks = await taskService.getByBoardId(boardId);
  return res.json(tasks);
});

router.route('/').post(async (req, res, next) => {
  const { boardId } = req.params;
  const { body } = req;

  const taskData = Task.getFromRequest(body);

  try {
    const result = await taskService.create({ ...taskData, boardId });
    if (!result) {
      return res.sendStatus(400);
    }
    return res.json(result);
  } catch (error) {
    return next(new HttpException());
  }
});

router.route('/:taskId').get(async (req, res, next) => {
  const { taskId } = req.params;
  const result = await taskService.getById(taskId);
  if (!result) {
    return next(new TaskNotFoundException(taskId));
  }

  return res.json(result);
});

router.route('/:taskId').put(async (req, res) => {
  const { taskId } = req.params;
  const taskData = Task.getFromRequest(req.body);

  const result = await taskService.update(taskId, taskData);

  if (!result) {
    return res.sendStatus(400);
  }

  return res.json(result);
});

router.route('/:taskId').delete(async (req, res, next) => {
  const { taskId } = req.params;
  const result = await taskService.remove(taskId);
  if (!result) {
    return next(new TaskNotFoundException(taskId));
  }
  return res.sendStatus(204);
});

module.exports = router;
