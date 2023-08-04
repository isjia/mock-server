// ref: https://dev.to/vcpablo/js-mocking-a-rest-api-with-json-server-368

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

router.render = (req, res) => {
  const data = res.locals.data
  // console.log(data)
  res.jsonp({
    code: 0,
    data,
    message: 'success'
  })
}

const port = 3333
server.listen(port, () => {
  console.log('JSON Server is running on port: ', port)
})
