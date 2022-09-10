const basePath = process.cwd();
const { startCreating, buildSetup } = require(`${basePath}/src/main.js`);

function genArt(layers, dirName, numEditions){
  var layerConfigurations = [
    {
      growEditionSizeTo: numEditions,
      layersOrder: layers,
    }
  ];
  buildSetup();
  startCreating(layerConfigurations, dirName);
}

module.exports = { genArt };