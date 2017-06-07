var net = require('net')
var path = require('path')
var level = require('level-party')
var osmdb = require('osm-p2p')
var obsdb = require('osm-p2p-observations')
var mkdirp = require('mkdirp')

var dir = path.join(__dirname, 'tmp', 'osm-p2p-peer')
mkdirp.sync(dir)

var db = level(path.join(dir, 'osm-obs.db'))
var osm = osmdb(path.join(dir, 'osm.db'))
var obs = obsdb({ db: db, log: osm.log })

replicate(osm.log.replicate())

function replicate (logstream) {
  console.log('starting replication with server')

  var stream = net.createConnection({ port: 3000 }, function () {
    console.log('connected')
    var pending = 2

    logstream.pipe(stream).pipe(logstream)

    logstream.on('end', onend)
    stream.on('end', onend)

    stream.on('error', error)
    logstream.on('error', error)

    function onend () {
      console.log('onend called')
      if (--pending !== 0) return

      console.log('done')
    }

    function error (err) {
      replicating = false
      console.log('replication error', err.message)
    }
  })
}
