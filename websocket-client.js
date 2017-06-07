var level = require('level-browserify')
var osmdb = require('osm-p2p')
var obsdb = require('osm-p2p-observations')
var websocket = require('websocket-stream')

var db = level('osm-p2p')
var osm = osmdb('osm.db')
var obs = obsdb({ db: db, log: osm.log })

var ws = websocket('ws://127.0.0.1:3131', {
  perMessageDeflate: false
})

replicate(osm.log.replicate())

function replicate (logstream) {
  console.log('starting replication with server')

  var pending = 2
  ws.pipe(logstream).pipe(ws)

  logstream.on('end', () => {
    console.log('logstream')
    onend()
  })

  ws.on('close', () => {
    console.log('ws close')
    onend()
  })

  ws.on('error', error)
  logstream.on('error', error)

  function onend (a) {
    console.log('onend called')
    if (--pending !== 0) return

    var q = [[47.6675, 47.668], [-122.384, -122.3835]]

    osm.query(q, function (err, pts) {
      if (err) return console.error(err)
      console.log('query results count:', pts.length)
    })
  }

  function error (err) {
    replicating = false
    console.log('replication error', err.message)
  }
}
