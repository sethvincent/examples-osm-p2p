var path = require('path')
var net = require('net')
var level = require('level')
var osmdb = require('osm-p2p')
var obsdb = require('osm-p2p-observations')
var mkdirp = require('mkdirp')

var dir = path.join(__dirname, 'tmp', 'osm-p2p-server')
mkdirp.sync(dir)

var db = level(path.join(dir, 'osm-obs.db'))
var osm = osmdb(path.join(dir, 'osm.db'))
var obs = obsdb({ db: db, log: osm.log })

function replicate (socket) {
  console.log('replication started')
  var pending = 2
  var replicating = true

  var stream = osm.log.replicate()
  socket.pipe(stream).pipe(socket)

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

var server = net.createServer(replicate)

server.listen(3000, function () {
  console.log('http://127.0.0.1:3000')
})
