const jwt = require('jsonwebtoken');

const User = require('../resources/users/user.model');
const AuthTokenMissingException = require('../exceptions/AuthTokenMissing');
const WrongAuthTokenException = require('../exceptions/WrongAuthToken');

async function authMiddleware(request, response, next) {
  try {
    const authHeader = request.get('authorization');
    if (!authHeader) {
      throw new AuthTokenMissingException();
    }

    const secret = process.env.JWT_SECRET_KEY;
    const token = authHeader.startsWith('Bearer ')
      ? authHeader.slice(7, authHeader.length)
      : authHeader;

    const verificationResponse = jwt.verify(token, secret);
    const { _id } = verificationResponse;
    const userDoc = await User.findById(_id);
    if (!userDoc) {
      throw new WrongAuthTokenException();
    }

    request.user = userDoc;
    return next();
  } catch (error) {
    return next(error);
  }
}

module.exports = authMiddleware;
