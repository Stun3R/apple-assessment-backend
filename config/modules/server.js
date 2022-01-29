'use strict'

module.exports = {
  port: 3000,
  isDev: process.env.NODE_ENV === 'development',
  isProd: process.env.NODE_ENV === 'production',
  environment: process.env.NODE_ENV || 'development',
}
