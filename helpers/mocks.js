'use strict'

const { faker } = require('@faker-js/faker')
const fakeTitle = require('./fakeTitle')

exports.projects = (amount = 50) => {
  const projects = []
  const categories = [
    faker.commerce.department(),
    faker.commerce.department(),
    faker.commerce.department(),
  ]

  for (let i = 0; i < amount; i++) {
    projects.push({
      title: fakeTitle(faker.name.title(), 20),
      category: faker.random.arrayElement(categories),
    })
  }
  return projects
}

exports.assignees = (amount = 10) => {
  const assignees = []

  for (let i = 0; i < amount; i++) {
    assignees.push({
      nickname: `${faker.name.firstName()} ${faker.name.lastName()}`,
    })
  }
  return assignees
}
