const basePath = process.cwd();
const { startCreating, buildSetup } = require(`${basePath}/src/main.js`);

async function genArt (layers, dirName, numEditions){
  var layerConfigurations = [
    {
      growEditionSizeTo: numEditions,
      layersOrder: layers,
    }
  ];
  buildSetup(dirName);
  await startCreating(layerConfigurations, dirName);
}

module.exports = { genArt };