'use strict'

const { pipe } = require('lodash/fp')

/**
 * Check pageSize & current min values
 */
const ensureMinValues = ({ current, pageSize }) => ({
  current: Math.max(current, 1),
  pageSize: Math.max(pageSize, 1),
})

/**
 * Check pageSize max values
 */
const ensureMaxValues = ({ current, pageSize }) => ({
  current,
  pageSize: pageSize > 100 ? 100 : pageSize,
})

const ensureValidValues = pipe(ensureMinValues, ensureMaxValues)

/**
 * Return a formatted pagination object
 */
const createPagination = ({ total, current, pageSize }) => {
  const validValues = ensureValidValues({ current, pageSize })

  return {
    ...validValues,
    pageSize: pageSize === -1 ? total : validValues.pageSize,
    total,
    pageCount: pageSize === -1 ? 1 : Math.ceil(total / validValues.pageSize),
  }
}

module.exports = createPagination
