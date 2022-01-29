'use strict'

const { pipe } = require('lodash/fp')

/**
 * Check pageSize & page min values
 */
const ensureMinValues = ({ page, pageSize }) => ({
  page: Math.max(page, 1),
  pageSize: Math.max(pageSize, 1),
})

/**
 * Check pageSize max values
 */
const ensureMaxValues = ({ page, pageSize }) => ({
  page,
  pageSize: pageSize > 100 ? 100 : pageSize,
})

const ensureValidValues = pipe(ensureMinValues, ensureMaxValues)

/**
 * Return a formatted pagination object
 */
const createPagination = ({ total, page, pageSize }) => {
  const validValues = ensureValidValues({ page, pageSize })

  return {
    ...validValues,
    pageSize: pageSize === -1 ? total : validValues.pageSize,
    total,
    pageCount: pageSize === -1 ? 1 : Math.ceil(total / validValues.pageSize),
  }
}

module.exports = createPagination
