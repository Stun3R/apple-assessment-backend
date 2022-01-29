const Boom = require('@hapi/boom')

module.exports = async (ctx, next) => {
  try {
    await next()
  } catch (err) {
    ctx.status = err.statusCode || err.status || 500
    console.log(err)
    if (Boom.isBoom(err)) {
      ctx.body = {
        ...err.output.payload,
      }
    } else {
      ctx.body = {
        statusCode: ctx.status,
        error: 'Interal',
        message: err.message,
      }
    }
  }
}
