import 'dotenv/config'
import express, { json } from 'express'
import morgan from 'morgan'
import mainRouter from './router'
const app = express()
const port = 5000
const NODE_ENV = process.env.NODE_ENV || 'development'
app.use(json())
app.use(morgan('dev'))
app.use(mainRouter)
app.get('/', (req, res) => {
  res.send({
    name: 'gez-api',
    version: '1.0.0',
    description: 'Api for Gez project'
  })
})
app.listen(port, () => NODE_ENV === 'development' && console.log(`Server started on port: http://localhost:${port}`)
)
