'use strict'

const { join, parse, basename } = require('path')
const { readdirSync } = require('fs')
const _ = require('lodash')

/**
 * Load every files of a given directory & inject dependency if specitified
 */
exports.loadFiles = ({ dir, dependency = null, capitalize = false }) => {
  const files = {}

  readdirSync(dir)
    .filter((file) => file !== basename(__filename))
    .forEach((file) => {
      let tmp
      if (dependency) tmp = require(join(dir, file))(dependency)
      else tmp = require(join(dir, file))

      const name = capitalize
        ? _.capitalize(parse(file).name)
        : parse(file).name
      files[name] = tmp
    })
  return files
}
