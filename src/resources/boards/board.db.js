const Board = require('./board.model');

class BoardDB {
  constructor(boards = []) {
    this._db = [...boards];

    this.create = this.create.bind(this);
    this.findAll = this.findAll.bind(this);
    this.findById = this.findById.bind(this);
    this.updateOne = this.updateOne.bind(this);
  }

  create(boardData) {
    const board = new Board(boardData);
    this._db = [...this._db, board];
    return board;
  }

  findAll() {
    return [...this._db];
  }

  findById(boardId) {
    return this._db.find(({ id }) => id === boardId);
  }

  updateOne(boardId, boardData) {
    this._db = this._db.map((board) => {
      if (board.id === boardId) {
        return new Board({ ...board, ...boardData });
      }
      return board;
    });
    return this._db.find(({ id }) => id === boardId);
  }

  remove(boardId) {
    const board = this._db.find(({ id }) => id === boardId);
    if (!board) return null;
    this._db = this._db.filter(({ id }) => id !== boardId);
    return board;
  }
}

const boardsDb = new BoardDB();

module.exports = boardsDb;
