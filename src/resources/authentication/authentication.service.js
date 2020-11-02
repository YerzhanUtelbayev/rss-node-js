const jwt = require('jsonwebtoken');

const { JWT_SECRET_KEY } = require('../../common/config');
const User = require('../../resources/users/user.model');
const WrongCredentialsException = require('../../exceptions/WrongCredentials');

const createToken = (userId, login) => {
  const expiresIn = 60 * 60;
  const secret = JWT_SECRET_KEY;

  const dataStoredInToken = { userId, login };
  return {
    expiresIn,
    token: jwt.sign(dataStoredInToken, secret, { expiresIn })
  };
};

const signIn = async (login, password) => {
  const userDoc = User.findOne({ login });
  if (!userDoc) {
    throw new WrongCredentialsException();
  }

  const isPasswordMatching = await userDoc.checkPassword(password);
  if (!isPasswordMatching) {
    throw new WrongCredentialsException();
  }

  const tokenData = createToken(userDoc.id, login);

  return { token: tokenData };
};

module.exports = { signIn };
