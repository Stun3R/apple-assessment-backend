'use strict'

const { join, parse } = require('path')
const { readdirSync } = require('fs')

/**
 * Load every files of a given directoy & inject config if specified
 */
const loadFiles = ({ dir, config }) => {
  const result = {}

  readdirSync(dir).forEach((file) => {
    let tmp
    if (config) {
      tmp = require(join(dir, file))(config)
    } else {
      tmp = require(join(dir, file))
    }
    result[parse(file).name] = tmp
  })
  return result
}

module.exports = { loadFiles }
