require('dotenv').load()

const db = require('../db/knex')
const knex = require('knex')
const config = require('../knexfile')[process.env.NODE_ENV]
let connection = knex(config)

beforeEach(async (done) => {
  connection = knex(config)
  await connection.seed.run()
  done()
})

afterEach(async (done) => {
  await connection.destroy()
  done()
})

afterAll(() => db.destroy())
