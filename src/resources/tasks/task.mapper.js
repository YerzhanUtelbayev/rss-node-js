class Task {
  static mapRequest(requestBody) {
    const {
      title,
      order,
      description,
      userId,
      boardId,
      columnId
    } = requestBody;
    return { title, order, description, userId, boardId, columnId };
  }

  static toResponse(task) {
    const { _id, title, order, description, userId, boardId, columnId } = task;
    return { id: _id, title, order, description, userId, boardId, columnId };
  }
}

module.exports = Task;
