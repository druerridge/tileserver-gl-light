# tileserver-gl-light

A trimmed down fork of [tileserver-gl](https://github.com/klokantech/tileserver-gl) for serving MBTiles and
predefined Mapbox GL styles.
Built to support serving vectortiles from [OSM2VectorTiles](http://osm2vectortiles.org/).

## Get Started

Install `tileserver-gl-light` from npm.

```bash
npm install -g tileserver-gl-light
```

Now download vector tiles from [OSM2VectorTiles](http://osm2vectortiles.org/downloads/).

```bash
curl -o zurich_switzerland.mbtiles https://osm2vectortiles-downloads.os.zhdk.cloud.switch.ch/v2.0/extracts/zurich_switzerland.mbtiles
```

Start `tileserver-gl-light` with the downloaded vector tiles.

```bash
tileserver-gl-light zurich_switzerland.mbtiles
```

## More Information

This trimmed tileserver is merely for demonstration purposes.
We recommend [tileserver-gl](https://github.com/klokantech/tileserver-gl)
for production usage.

## Style and Glyphs Copyright

These styles are derived from https://github.com/mapbox/mapbox-gl-styles
therefore Mapbox Open Styles are copyright (c) 2014, Mapbox, all rights reserved.
