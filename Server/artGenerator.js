const basePath = process.cwd();
const { startCreating, buildSetup } = require(`${basePath}/src/main.js`);

function genArt(layers){
  var layerConfigurations = [
    {
      growEditionSizeTo: 5,
      layersOrder: layers,
    }
  ];
  buildSetup();
  startCreating(layerConfigurations);
}

module.exports = { genArt };