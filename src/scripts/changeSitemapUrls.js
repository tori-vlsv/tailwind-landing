const fs = require('fs')
const someFile = './dist/sitemap.xml';
const realUrl = 'https://yourwebsite.ru';

fs.readFile(someFile, 'utf8', function (err, data) {
  const result = data.replace(/http:\/\/localhost:8080/g, realUrl);
  fs.writeFile(someFile, result, 'utf8', function() {});
});