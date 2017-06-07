var fs = require('fs')
var path = require('path')
var importer = require('osm-p2p-db-importer')
var mkdirp = require('mkdirp')

var dir = path.join(__dirname, 'tmp', 'osm-p2p-' + process.argv[2], 'osm.db', 'log')
var file = path.join(__dirname, process.argv[3])
var xml = fs.createReadStream(file)

mkdirp.sync(dir)

console.log('importing \nfrom', file, '\nto', dir)

importer(dir, xml, function (err) {
  console.log(err ? err : 'done')
})
