'use strict'

const { faker } = require('@faker-js/faker')

/**
 * Generate a faker title & make sure it doesn't take much than 20 characters
 */
module.exports = () => {
  let title = faker.name.title()
  if (title.length > 20) {
    title = title.split(' ')
    const tooMuch = title.length - 1
    title.splice(tooMuch, 1)
    return title.join(' ')
  }
  return title
}
