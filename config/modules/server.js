'use strict'

module.exports = {
  port: process.env.PORT || 1337,
  isDev: process.env.NODE_ENV === 'development',
  isProd: process.env.NODE_ENV === 'production',
  environment: process.env.NODE_ENV || 'development',
}
