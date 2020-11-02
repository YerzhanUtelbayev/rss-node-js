const router = require('express').Router();

const asyncHandler = require('../../common/async.handler');
const authenticationService = require('./authentication.service');

router.route('/login').post(
  asyncHandler(async (request, response) => {
    const {
      body: { login, password }
    } = request;

    const token = await authenticationService.signIn(login, password);
    return response.json(token);
  })
);

module.exports = router;
