var fs = require('fs');
var request = require('request');

request('http://dir.xiph.org/yp.xml').pipe(fs.createWriteStream('stations.xml'))
