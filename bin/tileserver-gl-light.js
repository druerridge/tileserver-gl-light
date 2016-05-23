#!/usr/bin/env node
'use strict';

var path = require('path');
var opts = require('nomnom')
  .option('mbtiles', {
    required: true,
    position: 0,
    help: "MBTiles path"
  })
  .option('port', {
    abbr: 'p',
    default: 8080,
    help: 'Port'
  })
  .option('version', {
    abbr: 'v',
    flag: true,
    help: 'Version info',
    callback: function() {
      return 'version ' + require('../package.json').version;
    }
  }).parse();

return require('../src/server')({
  installationPath: path.dirname(path.dirname(module.filename)),
  port: opts.port,
  mbtilesFile: opts.mbtiles
});
