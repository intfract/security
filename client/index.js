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
  const tor = await document.createElement('span')
  tor.innerHTML = await json.tor ? `IP was found on the <strong>tor</strong> network!` : `IP is not from tor!`
  document.body.appendChild(tor)
  const e = await document.createElement('ul')
  for (const [key, value] of Object.entries(await json.security)) {
    console.log(key, value)
    e.innerHTML += await `${value ? `<li>${key}</li>` : ''}`
  }
  document.body.appendChild(e)
}

grab()