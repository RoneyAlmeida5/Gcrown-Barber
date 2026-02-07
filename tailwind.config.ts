module.exports = {
  // Verifique se os caminhos estão corretos para a sua estrutura
  content: [
    "./App.{js,jsx,ts,tsx}",
    "./src/**/*.{js,jsx,ts,tsx}",
    "./index.{js,ts,tsx}", // Adicione se estiver usando index.ts como entrada
  ],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {},
  },
  plugins: [],
};
