const express = require('express')
const path = require('path')
const http = require('http')

const app = express()

if (process.env.NODE_ENV === 'production') {
  app.use('/', express.static(path.join(__dirname, 'client', 'build')))
  app.get('*', (_, res) => res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html')))
}

const start = async () => {
  try {
    http.createServer(app).listen(80, () => console.log(`App has been started on port 80...`))
  } catch (e) {
    console.log('Server Error', e.message)
    process.exit(1)
  }
}

start()
