const User = require('./user.model');

class UserDB {
  constructor(users = []) {
    this._db = [...users];

    this.create = this.create.bind(this);
    this.findAll = this.findAll.bind(this);
    this.findById = this.findById.bind(this);
    this.updateOne = this.updateOne.bind(this);
    this.remove = this.remove.bind(this);
  }

  create(userData) {
    if (this._db.some(({ name }) => name === userData.name)) {
      throw new Error('User with this name already exists');
    }
    const user = new User(userData);
    this._db = [...this._db, user];
    return user;
  }

  findAll() {
    return [...this._db];
  }

  findById(userId) {
    return this._db.find(({ id }) => id === userId);
  }

  updateOne(userId, userData) {
    this._db = this._db.map((user) => {
      if (user.id === userId) {
        return new User({ ...user, ...userData });
      }
      return user;
    });
    return this._db.find(({ id }) => id === userId);
  }

  remove(userId) {
    const user = this._db.find(({ id }) => id === userId);
    if (!user) return null;
    this._db = this._db.filter(({ id }) => id !== userId);
    return user;
  }
}

const usersDb = new UserDB();

module.exports = usersDb;
