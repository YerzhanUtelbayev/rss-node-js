class Board {
  static fromRequest(requestBody) {
    const { title, columns } = requestBody;
    return { title, columns };
  }

  static toResponse(board) {
    const { _id, title, columns } = board;
    return { id: _id, title, columns };
  }
}

module.exports = Board;
