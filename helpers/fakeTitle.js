'use strict'

/**
 * Generate a faker title & make sure it doesn't take much than 20 characters
 */
const fakeTitle = (title, max) =>
  title.length < max
    ? title
    : title.substr(0, title.substr(0, max).lastIndexOf(' '))

module.exports = fakeTitle
