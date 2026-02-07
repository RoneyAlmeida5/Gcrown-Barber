module.exports = function (api) {
  api.cache(true);
  return {
    presets: [
      ["babel-preset-expo", { jsxImportSource: "nativewind" }],
      "nativewind/babel", // Tente colocar como preset se o plugin falhar
    ],
    // Remova 'nativewind/babel' da lista de plugins se estiver lá
  };
};
