var request = require('request');
var cheerio = require('cheerio');
var fs = require('fs');
var stations = require('./stations-raw.json');

var url = "http://dir.xiph.org/search?search=";
var todo = 0;
var i = 0;
stations.directory.entry.forEach(function(){ todo++; });

stations.directory.entry.forEach(addMetadataToStation);

function addMetadataToStation(station){

  var search = station.server_name[0];

  request(url + search, function (error, response, body) {
    if (!error && response.statusCode == 200) {
      var $ = cheerio.load(body);
      var streams = $('.description');
      streams.each(function(key, value){
        var name = $(value).find('.stream-name a').html();
        if (name != search)
          return;
        station.listeners = $(value).find('.stream-name .listeners').html().substr(1).replace(/\&nbsp.*$/g, '');
        station.description = $(value).find('.stream-description').html();
      });
    } 
    todo--;
    console.log(todo);

    if (todo == 0){
      fs.writeFileSync("stations-plus.json", JSON.stringify(stations));
    }
  });
}
