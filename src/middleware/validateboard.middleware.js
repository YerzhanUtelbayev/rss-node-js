const BoardNotFoundException = require('../exceptions/BoardNotFoundException');
const boardService = require('../resources/boards/board.service');

async function validateBoard(request, response, next) {
  try {
    const { boardId } = request.params;
    const board = await boardService.getById(boardId);
    if (!board) {
      return next(new BoardNotFoundException(boardId));
    }
    return next();
  } catch (error) {
    return next(error);
  }
}

module.exports = validateBoard;
