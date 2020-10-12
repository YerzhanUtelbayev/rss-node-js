const boardRepo = require('./board.memory.repository');

const create = (boardData) => boardRepo.create(boardData);

const getAll = () => boardRepo.getAll();

const getById = (boardId) => boardRepo.getById(boardId);

const update = (boardId, boardData) => boardRepo.update(boardId, boardData);

const remove = (boardId) => boardRepo.remove(boardId);

module.exports = { create, getAll, getById, update, remove };
