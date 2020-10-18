const Joi = require('joi');

const ID = Joi.string().guid({ version: ['uuidv4'] });

const COLUMN = Joi.object().keys({
  id: ID,
  title: Joi.string(),
  order: Joi.number().min(0)
});

const BOARD = Joi.object().keys({
  id: ID.optional(),
  title: Joi.string().min(3).max(30).required(),
  columns: Joi.array().items(COLUMN)
});

const TASK = Joi.object().keys({
  id: ID.optional(),
  title: Joi.string().min(3).max(30).required(),
  order: Joi.number().min(0),
  description: Joi.string(),
  userId: ID.allow(null),
  boardId: ID.allow(null),
  columnId: ID.allow(null)
});

const USER = Joi.object().keys({
  id: ID.optional(),
  name: Joi.string().min(3).max(30).required(),
  login: Joi.string().min(3).max(30).required(),
  password: Joi.string().min(3).max(30).required()
});

const BOARD_DETAIL = {
  boardId: ID
};

module.exports = { BOARD, BOARD_DETAIL, TASK, USER };
