import { render } from 'inflict'
import express from 'express'
const app = express()

app.use(express.static('public'))

app.get('/', async (req, res) => {
  res.send(render('views', '', { message: 'Hello!', todo: ['Eat', 'Code'] })) 
})

app.listen(3000)