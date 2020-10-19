const router = require('express').Router({ mergeParams: true });

const asyncHandler = require('../../common/async.handler');
const taskController = require('./task.controller');
const validationMiddleware = require('../../middleware/validation.middleware');
const schemas = require('../../common/validation.schemas');
const validateBoard = require('../../middleware/validateboard.middleware');

router.use(validateBoard);
router.param('taskId', validationMiddleware(schemas.TASK_DETAIL, 'params'));

router.route('/').get(asyncHandler(taskController.getAll));

router
  .route('/')
  .post(
    validationMiddleware(schemas.TASK, 'body'),
    asyncHandler(taskController.create)
  );

router.route('/:taskId').get(asyncHandler(taskController.getById));

router
  .route('/:taskId')
  .put(
    validationMiddleware(schemas.TASK, 'body'),
    asyncHandler(taskController.update)
  );

router.route('/:taskId').delete(asyncHandler(taskController.remove));

module.exports = router;
