// express
const express = require('express')
const cors = require('cors')
const morgan = require('morgan')
const dotenv = require('dotenv')
const bodyParser = require('body-parser')
const port = process.env.PORT || 3000

// config app w/ routes
dotenv.config()
const app = express()
const { snacksRoutes, reviewsRoutes } = require('./routes')

// middleware
const processErrorMessage = require('./middleware/errors')

app.use(cors())
app.use(bodyParser.json())
app.use(morgan('dev'))
app.disable('x-powered-by')

// listener
if (process.env.NODE_ENV !== 'test') {
  app.listen(port, () => console.log(`Listening on port ${port}`))
}

// API
app.use('/api/snacks', snacksRoutes)
app.use('/api/snacks/:id/reviews', reviewsRoutes)

// EH
app.use((req, res) => {
  const status = 404
  const message = `Could not ${req.method} ${req.path}`

  res.status(status).json({ status, message })
})

app.use((err, req, res, next) => {
  error = processErrorMessage(err)

  if (process.env.NODE_ENV !== 'test') console.error(error)
  const { status, message } = error

  res.status(error.status).json(error)
})

module.exports = app
