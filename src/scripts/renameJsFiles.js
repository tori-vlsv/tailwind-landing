const fs = require("fs");
const path = require("path");
const folder = path.resolve("./src/markdown/build") + "/";
fs.readdir(folder, (err, files) => {
  files.forEach((file) => {
		const fileName = file.replace(/\.[^.]+$/, "");
		let newExtension = path.extname(file).replace(path.extname(file), '.mjs');
    fs.rename(folder + file, folder + fileName + newExtension, () => {});
  });
});

