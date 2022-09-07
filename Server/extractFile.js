var fs = require('fs');

var unzipper = require('unzipper');
fs.mkdirSync("./output/path2");
var stream = fs.createReadStream('./fu/NFT.zip').pipe(unzipper.Extract({ path: 'output/path2' }));
stream.on('finish', function () { 
  console.log(getDirectories("./output/path2"))
});

const getDirectories = source =>
  fs.readdirSync(source, { withFileTypes: true })
    .filter(dirent => dirent.isDirectory())
    .map(dirent => dirent.name)

  

