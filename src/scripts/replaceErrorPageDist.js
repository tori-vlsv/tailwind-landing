const fs = require('fs');
fs.copyFile('./dist/404/index.html', './dist/404/404.html', (err) => {
	fs.copyFile('./dist/404/404.html', './dist/404.html', (err) => {});
});