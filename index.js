import { render } from 'inflict'
import express from 'express'
import fetch from 'node-fetch'
import bodyParser from 'body-parser'
import fs from 'fs'

import * as dotenv from 'dotenv'
dotenv.config()

const app = express()

const port = process.env.PORT || 3000

try {
  const scripts = fs.readdirSync('client').filter(file => file.endsWith('.js'))
  for (const script of scripts) {
    const file = fs.readFileSync(`client/${script}`, 'utf-8').replace('$', `'https://${port}-${process.env.GITPOD_WORKSPACE_URL.replace('https://', '')}/ip'`)
    fs.writeFileSync(`public/${script}`, file)
  }
  console.log('Copied client scripts!')
} catch (e) {
  console.log(e)
}

app.use(express.static('public'))
app.use(bodyParser.json())

async function post(data) {
  const json = JSON.stringify([data])
  const response = await fetch(`https://crudapi.co.uk/api/v1/ip`, {
    method: 'POST',
    body: json,
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${process.env.crud}`
    },
  })
  return await response.json()
}

app.get('/', async (req, res) => {
  res.send(render('views', '', { message: '' })) 
})

app.post('/ip', async (req, res) => {
  const { ip } = req.body
  const check = await req.headers['x-forwarded-for'] || req.socket.remoteAddress // easily deceived
  if (ip === check) {
    try {
      const response = await fetch(`https://vpnapi.io/api/${ip}?key=${process.env.vpn}`)
      const json = await response.json()
      console.log(json)
      res.json({
        message: 'success',
      })
    } catch (e) {
      console.log(e)
      res.json({
        error: 'invalid',
        message: 'invalid ip provided',
      })
    }
  } else {
    res.json({
      error: 'sus',
      message: 'suspicious request',
    })
  }
})

app.listen(port)