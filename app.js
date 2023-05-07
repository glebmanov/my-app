const express = require('express')
const cors = require('cors')
const cookieParser = require('cookie-parser')
const fileUpload = require('express-fileupload')
const path = require('path')
const http = require('http')

const db_users = require('./db/db_users')
const db_cocktails = require('./db/db_cocktails')
const db_weather = require('./db/db_weather')

const PORT = process.env.PORT || 4343
const app = express()

app.use(express.json())
app.use(express.static(path.resolve(__dirname, 'static')))
app.use(fileUpload({}))
app.use(cors())
app.use(cookieParser())
app.use('/api', require('./routes/index'))

if (process.env.NODE_ENV === 'production') {
  app.use('/', express.static(path.join(__dirname, 'client', 'build')))
  app.get('*', (_, res) => res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html')))
}

const start = async () => {
  try {
    await db_users.authenticate()
    await db_users.sync()

    await db_cocktails.authenticate()
    await db_cocktails.sync()

    await db_weather.authenticate()
    await db_weather.sync()

    http.createServer(app).listen(PORT, () => console.log(`App has been started on port ${PORT}...`))
  } catch (e) {
    console.log('Server Error', e.message)
    process.exit(1)
  }
}

start()
