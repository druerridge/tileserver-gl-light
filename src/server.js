#!/usr/bin/env node
'use strict';

var fs = require('fs'),
    path = require('path');

var clone = require('clone'),
    cors = require('cors'),
    express = require('express'),
    morgan = require('morgan');

var serve_font = require('./serve_font'),
    serve_style = require('./serve_style'),
    serve_data = require('./serve_data'),
    utils = require('./utils');


module.exports = function(opts, callback) {
  var app = express().disable('x-powered-by'),
      serving = {
        styles: {},
        rendered: {},
        data: {},
        fonts: { // default fonts, always expose these (if they exist)
          'Open Sans Regular': true,
          'Arial Unicode MS Regular': true
        }
      };

  app.enable('trust proxy');
  app.use(cors());

  callback = callback || function() {};

  if (process.env.NODE_ENV !== 'production' &&
      process.env.NODE_ENV !== 'test') {
    app.use(morgan('dev'));
  }
  var config = {
    "options": {
      "paths": {
        "root": "",
        "fonts": "glyphs",
        "sprites": "sprites",
        "styles": "styles",
        "mbtiles": path.resolve(path.dirname(opts.mbtilesFile))
      }
    },
    "styles": {
      "bright": {
        "style": "bright-v9.json"
      },
      "basic": {
        "style": "basic-v9.json"
      }
    },
    "data": {
      "osm2vectortiles": {
        "mbtiles": path.basename(opts.mbtilesFile)
      }
    }
  };

  var options = config.options || {};
  var paths = options.paths || {};
  options.paths = paths;

  paths.root = path.resolve(process.cwd(), paths.root || '');
  paths.styles = path.resolve(opts.installationPath, paths.styles || '');
  paths.fonts = path.resolve(opts.installationPath, paths.fonts || '');
  paths.sprites = path.resolve(opts.installationPath, paths.sprites || '');
  paths.mbtiles = path.resolve(paths.root, paths.mbtiles || '');

  var data = clone(config.data || {});

  Object.keys(config.styles || {}).forEach(function(id) {
    var item = config.styles[id];
    if (!item.style || item.style.length == 0) {
      console.log('Missing "style" property for ' + id);
      return;
    }

    if (item.serve_data !== false) {
      app.use('/styles/', serve_style(options, serving.styles, item, id,
        function(mbtiles) {
          var dataItemId;
          Object.keys(data).forEach(function(id) {
            if (data[id].mbtiles == mbtiles) {
              dataItemId = id;
            }
          });
          if (dataItemId) { // mbtiles exist in the data config
            return dataItemId;
          } else {
            var id = mbtiles.substr(0, mbtiles.lastIndexOf('.')) || mbtiles;
            // while (data[id]) id += '_';
            data[id] = {
              'mbtiles': mbtiles
            };
            return id;
          }
        }, function(font) {
          serving.fonts[font] = true;
        }));
    }
  });

  if (Object.keys(serving.styles).length > 0) {
    // serve fonts only if serving some styles
    app.use('/fonts/', serve_font(options, serving.fonts));
  }

  Object.keys(data).forEach(function(id) {
    var item = data[id];
    item.mbtiles = path.basename(opts.mbtilesFile);
    if (!item.mbtiles || item.mbtiles.length == 0) {
      console.log('Missing "mbtiles" property for ' + id);
      return;
    }

    app.use('/data/', serve_data(options, serving.data, item, id));
  });

  app.get('/styles.json', function(req, res, next) {
    var result = [];
    Object.keys(serving.styles).forEach(function(id) {
      var styleJSON = serving.styles[id];
      result.push({
        version: styleJSON.version,
        name: styleJSON.name,
        id: id,
        url: req.protocol + '://' + req.headers.host + '/styles/' + id + '.json'
      });
    });
    res.send(result);
  });

  var addTileJSONs = function(arr, req, type) {
    Object.keys(serving[type]).forEach(function(id) {
      var info = clone(serving[type][id]);
      info.tiles = utils.getTileUrls(req, info.tiles,
                                     type + '/' + id, info.format);
      arr.push(info);
    });
    return arr;
  };

  app.get('/rendered.json', function(req, res, next) {
    res.send(addTileJSONs([], req, 'rendered'));
  });
  app.get('/data.json', function(req, res, next) {
    res.send(addTileJSONs([], req, 'data'));
  });
  app.get('/index.json', function(req, res, next) {
    res.send(addTileJSONs(addTileJSONs([], req, 'rendered'), req, 'data'));
  });

  //------------------------------------
  // serve web presentations
  app.use('/', express.static(path.join(__dirname, '../public/resources')));

  var server = app.listen(process.env.PORT || opts.port, function() {
    console.log('Listening at http://%s:%d/',
                this.address().address, this.address().port);

    return callback();
  });

  setTimeout(callback, 1000);
  return {
    app: app,
    server: server
  };
};
