const path = require('path')
const jsonServer = require('json-server')
const server = jsonServer.create()
const router = jsonServer.router(path.join(__dirname, 'db.json'))
const middlewares = jsonServer.defaults()

server.use(
  jsonServer.rewriter({
    '/api/*': '/$1'
  })
)

server.use(middlewares)
server.use(jsonServer.bodyParser)

server.use(router)

const port = 3333
server.listen(port, () => {
  console.log('JSON Server is running on port: ', port)
})