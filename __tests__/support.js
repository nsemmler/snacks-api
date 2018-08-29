require('dotenv').load()

const db = require('../db/knex')
const knex = require('knex')
const config = require('../knexfile')[process.env.NODE_ENV]
let connection = knex(config)

beforeEach(() => {
  connection = knex(config)
  return connection.seed.run()
})

afterEach(() => {
  return connection.destroy()
})

afterAll(() => db.destroy())
