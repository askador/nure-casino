require('dotenv').config({path: `${__dirname}/../.env`})
const express = require('express')
const { sequelize } = require('./database')
const cors = require('cors')
const fileUpload = require('express-fileupload')
const routes = require('./routes')
const { errorHandler } = require('./middlewares')
const path = require('path')
const _models = require('./database/models')
const testDataset = require('./database/test-dataset')




const host = process.env.HOST //0.0.0.0
const port = process.env.PORT || 8080

const app = express()
app.use(cors())
app.use(express.json())
app.use(express.static(path.resolve(__dirname, 'static')))
app.use(express.static(path.resolve(__dirname, 'static', 'employees')))
app.use(fileUpload({}))
app.use('/api', routes)

// Обработка ошибок, последний Middleware
app.use(errorHandler)

const start = async () => {
  try {
    // sequelize.drop()
    // sequelize.sync({ alter: true })
    // testDataset()
    app.listen(port, host, () => console.log(`Server started on port ${port}`))
  } catch (e) {
    console.log(e)
  }
}


start()