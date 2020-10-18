const router = require('express').Router();

const User = require('./user.model');
const userService = require('./user.service');
const UserNotFoundException = require('../../exceptions/UserNotFoundException');
const validationMiddleware = require('../../middleware/validation.middleware');
const schemas = require('../../common/validation.schemas');

router.route('/').get(async (req, res) => {
  const users = await userService.getAll();
  res.json(users.map(User.toResponse));
});

router
  .route('/')
  .post(validationMiddleware(schemas.USER, 'body'), async (req, res) => {
    const { body } = req;
    const user = new User(body);

    try {
      const result = await userService.create(user);
      if (!result) {
        return res.sendStatus(400);
      }
      return res.json(User.toResponse(result));
    } catch (error) {
      console.log(error);
      return res.sendStatus(500);
    }
  });

router.route('/:id').get(async (req, res, next) => {
  const { id } = req.params;
  const result = await userService.getById(id);
  if (!result) {
    return next(new UserNotFoundException(id));
  }
  return res.json(User.toResponse(result));
});

router
  .route('/:id')
  .put(validationMiddleware(schemas.USER, 'body'), async (req, res) => {
    const { id } = req.params;
    const { name, login, password } = req.body;

    const result = await userService.update(id, { name, login, password });

    if (!result) {
      return res.sendStatus(400);
    }

    return res.json(User.toResponse(result));
  });

router.route('/:id').delete(async (req, res, next) => {
  const { id } = req.params;
  const result = await userService.remove(id);
  if (!result) {
    return next(new UserNotFoundException(id));
  }
  return res.sendStatus(204);
});

module.exports = router;
