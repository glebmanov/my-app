const express = require('express')
const path = require('path')
const http = require('http')

const PORT = process.env.PORT || 4343
const app = express()

app.use(express.json())
app.use('/api', require('./routes/weather.routes'))
app.use('/api', require('./routes/cocktail.routes'))
app.use('/api', require('./routes/ingredient.routes'))
app.use('/api', require('./routes/category.routes'))
app.use('/api', require('./routes/amount.routes'))

if (process.env.NODE_ENV === 'production') {
  app.use('/', express.static(path.join(__dirname, 'client', 'build')))
  app.get('*', (_, res) => res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html')))
}

const start = async () => {
  try {
    http.createServer(app).listen(PORT, () => console.log(`App has been started on port ${PORT}...`))
  } catch (e) {
    console.log('Server Error', e.message)
    process.exit(1)
  }
}

start()
