const router = require('express').Router();
const Board = require('./board.model');
const boardService = require('./board.service');

router.route('/').get(async (req, res) => {
  const boards = await boardService.getAll();
  return res.json(boards);
});

router.route('/').post(async (req, res) => {
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

router.route('/:id').get(async (req, res) => {
  const { id } = req.params;
  const result = await boardService.getById(id);
  if (!result) {
    return res.sendStatus(404);
  }

  return res.json(result);
});

router.route('/:id').put(async (req, res) => {
  const { id } = req.params;
  const { title, columns } = req.body;

  const result = await boardService.update(id, { title, columns });

  if (!result) {
    return res.sendStatus(400);
  }

  return res.json(result);
});

router.route('/:id').delete(async (req, res) => {
  const { id } = req.params;
  const result = await boardService.remove(id);
  if (!result) {
    return res.sendStatus(404);
  }
  return res.sendStatus(204);
});

module.exports = router;
