const BoardNotFoundException = require('../../exceptions/BoardNotFoundException');
const Board = require('./board.model');

const create = async (boardData) => {
  const boardDoc = new Board(boardData);
  return await boardDoc.save();
};

const getAll = async () => await Board.find({});

const getById = async (boardId) => await Board.findById(boardId);

const update = async (boardId, boardData) => {
  const boardDoc = await Board.findById(boardId);
  if (!boardDoc) {
    throw new BoardNotFoundException(boardId);
  }

  const { title, columns } = boardData;
  boardDoc.title = title;
  boardDoc.columns = columns;
  return await boardDoc.save();
};

const remove = async (boardId) => await Board.findByIdAndDelete(boardId);

module.exports = { create, getAll, getById, update, remove };
