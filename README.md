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
- [Inflict](https://npmjs.com/inflict) SSR

## Client and Server

The client and server can interact directly with the help of the [express](https://npmjs.com/express) framework.

1. The client grabs the visitor's IP with the help of [IP Info](https://ipinfo.io/json)
2. The client makes a `POST` request to the server at `/ip` with the visitor's IP address
3. The server receives the IP address and responds with data
  - The server will respond with `json.security` of type `Record<string, boolean>` if the visitor's IP matches the origin's IP
  - The server will respond with an error if the IP is invalid or does not match
4. The client displays the data 

This structure prevents people using inspect element from requesting IP data that is not their own.
