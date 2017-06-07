var path = require('path')
var level = require('level-party')
var osmdb = require('osm-p2p')
var obsdb = require('osm-p2p-observations')
var eos = require('end-of-stream')
var mkdirp = require('mkdirp')
var net = require('net')

var dir = path.join(__dirname, 'tmp', 'osm-p2p-' + process.argv[2])

var db = level(path.join(dir, 'osm-obs.db'))
var osm = osmdb(path.join(dir, 'osm.db'))
var obs = obsdb({ db: db, log: osm.log })

osm.kv.createReadStream().on('data', console.log)
