const Joi = require('joi')

exports.creationSchema = Joi.object({
  title: Joi.string().max(20).not(null).required(),
  category: Joi.string().not(null).required(),
  assigned_to: Joi.number().allow(null),
})

exports.updateSchema = Joi.object({
  title: Joi.string().max(20).not(null),
  category: Joi.string().not(null),
  assigned_to: Joi.number().allow(null),
})
