const router = require('express').Router();

const asyncHandler = require('../../common/async.handler');
const userController = require('./user.controller');
const validationMiddleware = require('../../middleware/validation.middleware');
const schemas = require('../../common/validation.schemas');

router.param('userId', validationMiddleware(schemas.USER_DETAIL, 'params'));

router.route('/').get(asyncHandler(userController.getAll));

router
  .route('/')
  .post(
    validationMiddleware(schemas.USER, 'body'),
    asyncHandler(userController.create)
  );

router.route('/:userId').get(asyncHandler(userController.getById));

router
  .route('/:userId')
  .put(
    validationMiddleware(schemas.USER, 'body'),
    asyncHandler(userController.update)
  );

router.route('/:userId').delete(asyncHandler(userController.remove));

module.exports = router;
