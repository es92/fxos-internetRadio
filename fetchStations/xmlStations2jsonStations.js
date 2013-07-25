xml2js = require('xml2js');
fs = require('fs');

var parser = new xml2js.Parser();
fs.readFile( 'stations.xml', function(err, data) {
    parser.parseString(data, function (err, result) {

      fs.writeFileSync("stations-raw.json", JSON.stringify(result));
    });
});

