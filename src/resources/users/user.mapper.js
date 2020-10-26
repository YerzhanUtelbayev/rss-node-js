class User {
  static mapRequest(requestBody) {
    const { name, login, password } = requestBody;
    return { name, login, password };
  }

  static toResponse(user) {
    const { _id, name, login } = user;
    return { id: _id, name, login };
  }
}

module.exports = User;
