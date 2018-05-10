import evn from 'dotenv'
import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'
import InitService from './services/InitService'
import { pathLog } from './middlewares/index'

evn.config()

const PORT = process.env.app__SERVER_PORT || 5055

const app = express()
app.use(pathLog)
app.use(cors())
app.use(bodyParser.json())

InitService()
  .then(() => {
    app.post('/', (req, res) => {
      res.status(200).send('OK')
    })

    app.listen(PORT, err => {
      if(err) {
        console.error(err)
      }
      console.log(`App listening on port ${PORT}`)
    })
  })