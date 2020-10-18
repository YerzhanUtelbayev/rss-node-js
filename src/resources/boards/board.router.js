const router = require('express').Router();

const Board = require('./board.model');
const boardService = require('./board.service');
const BoardNotFoundException = require('../../exceptions/BoardNotFoundException');
const validationMiddleware = require('../../middleware/validation.middleware');
const schemas = require('../../common/validation.schemas');

router.route('/').get(async (req, res) => {
  const boards = await boardService.getAll();
  return res.json(boards);
});

router
  .route('/')
  .post(validationMiddleware(schemas.BOARD, 'body'), async (req, res) => {
    const {
      body: { title, columns }
    } = req;
    const board = new Board({ title, columns });

    try {
      const result = await boardService.create(board);
      if (!result) {
        return res.sendStatus(400);
      }
      return res.json(result);
    } catch (error) {
      return res.sendStatus(500);
    }
  });

router.route('/:boardId').get(async (req, res, next) => {
  const { boardId } = req.params;
  const result = await boardService.getById(boardId);
  if (!result) {
    return next(new BoardNotFoundException(boardId));
  }

  return res.json(result);
});

router
  .route('/:boardId')
  .put(validationMiddleware(schemas.BOARD, 'body'), async (req, res) => {
    const { boardId } = req.params;
    const { title, columns } = req.body;

    const result = await boardService.update(boardId, { title, columns });

    if (!result) {
      return res.sendStatus(400);
    }

    return res.json(result);
  });

router.route('/:boardId').delete(async (req, res, next) => {
  const { boardId } = req.params;
  const result = await boardService.remove(boardId);
  if (!result) {
    return next(new BoardNotFoundException(boardId));
  }
  return res.sendStatus(204);
});

module.exports = router;
