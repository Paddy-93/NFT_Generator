const basePath = process.cwd();
const { startCreating, buildSetup } = require(`${basePath}/src/main.js`);

(() => {
  var layerConfigurations = [
    {
      growEditionSizeTo: 5,
      layersOrder: [
        { name: "Background" },
        { name: "Eyeball" },
        { name: "Eye color" },
        { name: "Iris" },
        { name: "Shine" },
        { name: "Bottom lid" },
        { name: "Top lid" },
      ],
    }
  ];
  buildSetup();
  startCreating(layerConfigurations);
})();
