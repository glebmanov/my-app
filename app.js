const express = require('express')
const path = require('path')
const http = require('http')

const app = express()

app.use('/api', require('./routes/weather.routes'))

if (process.env.NODE_ENV === 'production') {
  app.use('/', express.static(path.join(__dirname, 'client', 'build')))
  app.get('*', (_, res) => res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html')))
}

const start = async () => {
  try {
    http.createServer(app).listen(4343, () => console.log(`App has been started on port 4343...`))
  } catch (e) {
    console.log('Server Error', e.message)
    process.exit(1)
  }
}

start()
