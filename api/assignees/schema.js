const Joi = require('joi')

const schema = Joi.object({
  nickname: Joi.string().max(20).not(null).required(),
})

module.exports = schema
