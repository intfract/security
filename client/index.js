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
  console.log(await res.json())
}

grab()