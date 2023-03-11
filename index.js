/*
  Int Fract
  https://github.com/intfract
  Please leave this comment as attribution!
*/

import { render } from 'inflict'
import express from 'express'
import fetch from 'node-fetch'
import bodyParser from 'body-parser'
import fs from 'fs'

import * as dotenv from 'dotenv'
dotenv.config()

const app = express()

const port = process.env.PORT || 3000

function firewall(req, res, next) {
  const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress
  const blacklist = [] // add bad IP addresses
  if (blacklist.includes(ip)) {
    return res.status(401).send('SUS')
  }
  next()
}

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

const url = `'https://${port}-${process.env.GITPOD_WORKSPACE_URL.replace('https://', '')}/ip'` // use your own URL and wrap it with quotes

try {
  const scripts = fs.readdirSync('client').filter(file => file.endsWith('.js'))
  for (const script of scripts) {
    const file = fs.readFileSync(`client/${script}`, 'utf-8').replace('$', url) // replaces $ with Gitpod URL
    fs.writeFileSync(`public/${script}`, file)
  }
  console.log('Copied client scripts!')
} catch (e) {
  console.log(e)
}

app.use(express.static('public'))
app.use(bodyParser.json())
app.use(firewall)

app.get('/', async (req, res) => {
  res.send(render('views', '', { message: '' })) 
})

app.post('/ip', async (req, res) => {
  const { ip } = req.body
  const origin = await req.headers['x-forwarded-for'] || req.socket.remoteAddress // easily deceived
  try {
    const response = await fetch(`https://vpnapi.io/api/${ip}?key=${process.env.vpn}`)
    const { security, location } = await response.json()
    console.log(ip, security)
    if (ip === origin) {
      post({ ip, security, location })
      res.status(200).json({
        security
      })
    } else {
      // someone is using inspect element
      res.status(401).json({
        error: 'sus',
        message: 'suspicious activity',
      })
    }
  } catch (e) {
    console.log(e)
    res.json({
      error: 'invalid',
      message: 'invalid ip provided',
    })
  }
})

app.listen(port)