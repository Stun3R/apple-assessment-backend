'use strict'

const { faker } = require('@faker-js/faker')

exports.projects = (amount = 50) => {
  const projects = []

  for (let i = 0; i <= amount; i++) {
    projects.push({
      title: faker.name.title(),
      category: faker.commerce.department(),
    })
  }
  return projects
}

exports.assignees = (amount = 10) => {
  const assignees = []

  for (let i = 0; i <= amount; i++) {
    assignees.push({
      nickname: `${faker.name.firstName()} ${faker.name.lastName()}`,
    })
  }
  return assignees
}
