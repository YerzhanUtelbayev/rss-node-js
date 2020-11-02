const jwt = require('jsonwebtoken');

const { JWT_SECRET_KEY } = require('../common/config');
const User = require('../resources/users/user.model');
const AuthTokenMissingException = require('../exceptions/AuthTokenMissing');
const WrongAuthTokenException = require('../exceptions/WrongAuthToken');

async function authMiddleware(request, response, next) {
  try {
    const authHeader = request.get('authorization');
    if (!authHeader) {
      throw new AuthTokenMissingException();
    }

    const token = authHeader.startsWith('Bearer ')
      ? authHeader.slice(7, authHeader.length)
      : authHeader;
    if (!token) {
      throw new AuthTokenMissingException();
    }

    const verificationResponse = jwt.verify(token, JWT_SECRET_KEY);
    const { userId, login } = verificationResponse;
    const userDoc = await User.findById(userId);
    if (!userDoc || userDoc.login !== login) {
      throw new WrongAuthTokenException();
    }

    request.user = userDoc;
    return next();
  } catch (error) {
    return next(error);
  }
}

module.exports = authMiddleware;
