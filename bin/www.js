const http = require('http')
const serverHandle = require('../app')
const PORT = 8080
const server = http.createServer(serverHandle)
server.listen(PORT)
console.log('http://127.0.0.1:8080')