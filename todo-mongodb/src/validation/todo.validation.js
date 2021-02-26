const Joi = require('joi');

const objectId = (value, helpers) => {
  if (!value.match(/^[0-9a-fA-F]{24}$/)) {
    return helpers.message('"{{#label}}" must be a valid mongo id');
  }
  return value;
};

const createTodo = {
  body: Joi.object().keys({
    text: Joi.string(),
    isCompleted: Joi.boolean()
  })
}
module.exports = {
  objectId,
  createTodo,
};