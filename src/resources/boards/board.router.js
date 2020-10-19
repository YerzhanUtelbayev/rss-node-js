const router = require('express').Router();

const asyncHandler = require('../../common/async.handler');
const boardController = require('./board.controller');
const validationMiddleware = require('../../middleware/validation.middleware');
const schemas = require('../../common/validation.schemas');

router.param('boardId', validationMiddleware(schemas.BOARD_DETAIL, 'params'));

router.route('/').get(asyncHandler(boardController.getAll));

router
  .route('/')
  .post(
    validationMiddleware(schemas.BOARD, 'body'),
    asyncHandler(boardController.create)
  );

router.route('/:boardId').get(asyncHandler(boardController.getById));

router
  .route('/:boardId')
  .put(
    validationMiddleware(schemas.BOARD, 'body'),
    asyncHandler(boardController.update)
  );

router.route('/:boardId').delete(asyncHandler(boardController.remove));

module.exports = router;
