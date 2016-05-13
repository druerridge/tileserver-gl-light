# tileserver-vector

A trimmed down fork of [tileserver-gl](https://github.com/klokantech/tileserver-gl) for serving MBTiles and Mapbox GL styles.
Built to support serving vectortiles from [OSM2VectorTiles](http://osm2vectortiles.org/).

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

Now download vector tiles from [OSM2VectorTiles](http://osm2vectortiles.org/downloads/)
and store it as `osm2vectortiles.mbtiles` in the directory.

```bash
curl -o osm2vectortiles.mbtiles https://osm2vectortiles-downloads.os.zhdk.cloud.switch.ch/v1.0/extracts/zurich.mbtiles
```

Start the tileserver.

```bash
tileserver-vector
```

## More Information

More information is available on [tileserver-gl](https://github.com/klokantech/tileserver-gl) which we
also recommend for production usage.
