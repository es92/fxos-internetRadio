var fs = require('fs');

var genres = require('./genres.json').genres;

genres.sort();

genres = genres.map(function(genre){
  return genre.split(', ');
});


fs.writeFileSync("genres.json", JSON.stringify(genres));
