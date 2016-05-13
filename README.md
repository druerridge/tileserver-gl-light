# tileserver-vector

A trimmed down fork of [tileserver-gl](https://github.com/klokantech/tileserver-gl) for serving MBTiles and Mapbox GL styles.
Built to support serving vectortiles from http://osm2vectortiles.org/.

## Get Started

Install `tileserver-vector` from npm.

```bash
npm install -g tileserver-vector
```

Clone the example containing styles and fonts compatible with osm2vectortiles.

```bash
git clone https://github.com/osm2vectortiles/mapbox-gl-js-example.git
cd mapbox-gl-js-example
```

Start the tileserver.

```bash
tileserver-vector
```

## More Information

More information is available on [tileserver-gl](https://github.com/klokantech/tileserver-gl) which we
also recommend for production usage.
