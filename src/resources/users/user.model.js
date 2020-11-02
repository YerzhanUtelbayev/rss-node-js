const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const { SALT_WORK_FACTOR } = require('../../common/config');

const { Schema, model } = mongoose;

const UserSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
  login: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  }
});

UserSchema.pre('save', async function encryptIntoHash(next) {
  if (!this.isModified('password')) return next();

  const plainPassword = this.get('password');
  const salt = await bcrypt.genSalt(SALT_WORK_FACTOR);
  const hash = await bcrypt.hash(plainPassword, salt);
  this.set('password', hash);
  return next();
});

UserSchema.methods.checkPassword = async function checkPassword(password) {
  return await bcrypt.compare(password, this.password);
};

const User = model('User', UserSchema);

module.exports = User;
