# Security

Web Security Scripts
> **Note** This is written in ESM code

## Features

- IP Grabbing
- IP Detection
  - VPN
  - Proxy
  - Tor
  - Relay
- Secure Communication
- Blacklisting
- Inspect Element Disabler
- [Inflict](https://npmjs.com/inflict) SSR
- [Onionoo](https://npmjs.com/onionoo) Tor Detection

## Client and Server

The client and server can interact directly with the help of the [express](https://npmjs.com/express) framework.

1. The client grabs the visitor's IP with the help of [IP Info](https://ipinfo.io/json)
2. The client makes a `POST` request to the server at `/ip` with the visitor's IP address
3. The server receives the IP address and responds with data
  - The server will respond with `json.security` of type `Record<string, boolean>` if the visitor's IP matches the origin's IP
  - The server will respond with an error if the IP is invalid or does not match
4. The client displays the data 

This structure prevents people using inspect element from requesting IP data that is not their own.

### Client Scripts 

Scripts from the `client` folder are copied to the `public` folder after applying some changes. These changes usually involve replacing strings. 

```js
// replace the url variable with your own IP endpoint
const url = `'http://localhost:${port}'`
```

The url replaces the `$` unless you change it. 

```js
// client/index.js
async function grab() {
  const data = await fetch('https://ipinfo.io/json')
  const { ip, loc, country, city, org } = await data.json()
  const res = await fetch($, {
    method: 'POST',
    body: JSON.stringify({
      ip,
      org,
    }),
    headers: {
      'Content-Type': 'application/json',
    }
  })
  const json = await res.json()
  const e = await document.createElement('ul')
  for (const [key, value] of Object.entries(await json.security)) {
    console.log(key, value)
    e.innerHTML += await `${value ? `<li>${key}</li>` : ''}`
  }
  await document.body.appendChild(e)
}

grab()
```

### Kill Inspect Element 

Chrome DevTools or any other web inspection are virtually inaccessable thanks to the `inspect.js` file. 

## Advanced Tor Detection 

Sometimes [VPN API](https://vpnapi.io) can not detect tor, but the new update is **foolproof** and uses Onionoo to search for tor relays.

```js
import Onionoo from 'onionoo'
const onionoo = new Onionoo()

const query = {
  limit: 1,
  running: true,
  order: '-consensus_weight',
}

query['search'] = ip
const { body } = await onionoo.summary(query) // this would be inside an async function
```

You can forget about getting an API key if you only want to detect tor. 