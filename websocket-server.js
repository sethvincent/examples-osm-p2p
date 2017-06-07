var net = require('net')
var path = require('path')
var http = require('http')
var level = require('level')
var osmdb = require('osm-p2p')
var obsdb = require('osm-p2p-observations')
var mkdirp = require('mkdirp')
var websocket = require('websocket-stream')

var dir = path.join(__dirname, 'tmp', 'osm-p2p-websocket')
mkdirp.sync(dir)

var db = level(path.join(dir, 'osm-obs.db'))
var osm = osmdb(path.join(dir, 'osm.db'))
var obs = obsdb({ db: db, log: osm.log })

var server = http.createServer()
server.on('request', function (req) { console.log('req', req.url)})

var wss = websocket.createServer({
  perMessageDeflate: false,
  server: server
}, replicate)

function replicate (socket) {
  console.log('starting replication with client')

  var pending = 2
  var replicating = true

  var stream = osm.log.replicate()
  stream.pipe(socket).pipe(stream)

  stream.on('error', error)
  socket.on('error', error)

  stream.on('end', onend)
  socket.on('end', onend)

  function onend () {
    console.log('onend called')
    if (--pending !== 0) return

    replicating = false

    osm.ready(function () {
      console.log('done')
    })
  }

  function error (err) {
    replicating = false
    console.log('replication error', err.message)
  }
}

server.listen(3131)
