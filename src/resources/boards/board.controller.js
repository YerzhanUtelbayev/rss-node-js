const boardMapper = require('./board.mapper');
const boardService = require('./board.service');
const BoardNotFoundException = require('../../exceptions/BoardNotFoundException');
const EntityNotSavedException = require('../../exceptions/EntityNotSavedException');

const getAll = async (request, response) => {
  const boards = await boardService.getAll();
  return response.json(boards.map(boardMapper.toResponse));
};

const create = async (request, response) => {
  const { body } = request;
  const boardData = boardMapper.fromRequest(body);

  const result = await boardService.create(boardData);
  if (!result) {
    throw new EntityNotSavedException();
  }
  return response.json(boardMapper.toResponse(result));
};

const getById = async (request, response) => {
  const { boardId } = request.params;
  const result = await boardService.getById(boardId);
  if (!result) {
    throw new BoardNotFoundException(boardId);
  }

  return response.json(boardMapper.toResponse(result));
};

const update = async (request, response) => {
  const { boardId } = request.params;
  const { title, columns } = request.body;

  const result = await boardService.update(boardId, { title, columns });

  if (!result) {
    throw new EntityNotSavedException();
  }

  return response.json(boardMapper.toResponse(result));
};

const remove = async (request, response) => {
  const { boardId } = request.params;
  const result = await boardService.remove(boardId);
  if (!result) {
    throw new BoardNotFoundException(boardId);
  }
  return response.sendStatus(204);
};

module.exports = { getAll, create, getById, update, remove };
