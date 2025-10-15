const http = require('http')
http.get('http://localhost:5174/', res => {
  let data = ''
  res.on('data', d => data += d)
  res.on('end', () => console.log(data.slice(0, 800)))
}).on('error', e => console.error('ERR', e.message))
