# examples-osm-p2p

Examples of using [osm-p2p](https://npmjs.com/osm-p2p) and [osm-p2p-observations](https://npmjs.com/osm-p2p).

[![standard][standard-image]][standard-url]
[![conduct][conduct]][conduct-url]

[standard-image]: https://img.shields.io/badge/code%20style-standard-brightgreen.svg?style=flat-square
[standard-url]: http://npm.im/standard
[conduct]: https://img.shields.io/badge/code%20of%20conduct-contributor%20covenant-green.svg?style=flat-square
[conduct-url]: CONDUCT.md

## Install

```sh
git clone
cd examples-osm-p2p
```

## Running examples

## net

Using osm-p2p and osm-p2p-observations with node's net module.

1. Import data into the server: `node import.js server data/ballard.xml`
2. Run `node net-server.js`
3. Run `node net-client.js` in a new tab

## websockets

Using osm-p2p and osm-p2p-observations with websockets.

1. Import data into the server: `node import.js websocket data/ballard.xml`
2. Run `node websocket-server.js`
3. Run `node websocket-client.js` in a new tab

## Contact

- **issues** – Please open issues in the [issues queue](https://github.com/sethvincent/examples-osm-p2p/issues)

## License

[ISC](LICENSE.md)
