const Board = require('./board.model');
const boardService = require('./board.service');
const BoardNotFoundException = require('../../exceptions/BoardNotFoundException');

const getAll = async (request, response) => {
  const boards = await boardService.getAll();
  return response.json(boards);
};

const create = async (request, response) => {
  const {
    body: { title, columns }
  } = request;
  const board = new Board({ title, columns });

  const result = await boardService.create(board);
  if (!result) {
    return response.sendStatus(400);
  }
  return response.json(result);
};

const getById = async (request, response, next) => {
  const { boardId } = request.params;
  const result = await boardService.getById(boardId);
  if (!result) {
    return next(new BoardNotFoundException(boardId));
  }

  return response.json(result);
};

const update = async (request, response) => {
  const { boardId } = request.params;
  const { title, columns } = request.body;

  const result = await boardService.update(boardId, { title, columns });

  if (!result) {
    return response.sendStatus(400);
  }

  return response.json(result);
};

const remove = async (request, response, next) => {
  const { boardId } = request.params;
  const result = await boardService.remove(boardId);
  if (!result) {
    return next(new BoardNotFoundException(boardId));
  }
  return response.sendStatus(204);
};

module.exports = { getAll, create, getById, update, remove };
