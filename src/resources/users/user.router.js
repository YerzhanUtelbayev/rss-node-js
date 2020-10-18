const router = require('express').Router();

const User = require('./user.model');
const userService = require('./user.service');
const UserNotFoundException = require('../../exceptions/UserNotFoundException');
const validationMiddleware = require('../../middleware/validation.middleware');
const schemas = require('../../common/validation.schemas');

router.param('userId', validationMiddleware(schemas.USER_DETAIL, 'params'));

router.route('/').get(async (req, res) => {
  const users = await userService.getAll();
  res.json(users.map(User.toResponse));
});

router
  .route('/')
  .post(validationMiddleware(schemas.USER, 'body'), async (req, res) => {
    const { body } = req;
    const userData = User.mapRequest(body);

    try {
      const result = await userService.create(userData);
      if (!result) {
        return res.sendStatus(400);
      }
      return res.json(User.toResponse(result));
    } catch (error) {
      return res.sendStatus(500);
    }
  });

router.route('/:userId').get(async (req, res, next) => {
  const {
    params: { userId }
  } = req;
  const result = await userService.getById(userId);
  if (!result) {
    return next(new UserNotFoundException(userId));
  }
  return res.json(User.toResponse(result));
});

router
  .route('/:userId')
  .put(validationMiddleware(schemas.USER, 'body'), async (req, res) => {
    const {
      params: { userId },
      body
    } = req;
    const userData = User.mapRequest(body);

    const result = await userService.update(userId, userData);

    if (!result) {
      return res.sendStatus(400);
    }

    return res.json(User.toResponse(result));
  });

router.route('/:userId').delete(async (req, res, next) => {
  const { userId } = req.params;
  const result = await userService.remove(userId);
  if (!result) {
    return next(new UserNotFoundException(userId));
  }
  return res.sendStatus(204);
});

module.exports = router;
