const uuid = require('uuid');

class Task {
  constructor({
    id = uuid.v4(),
    title,
    order = 0,
    description = '',
    userId = null,
    boardId = null,
    columnId = null
  } = {}) {
    this.id = id;
    this.title = title;
    this.order = order;
    this.description = description;
    this.userId = userId;
    this.boardId = boardId;
    this.columnId = columnId;
  }

  static mapRequest(task) {
    const { title, order, description, userId, boardId, columnId } = task;
    return { title, order, description, userId, boardId, columnId };
  }

  static toResponse(task) {
    const { id, title, order, description, userId } = task;
    return { id, title, order, description, userId };
  }
}

module.exports = Task;
