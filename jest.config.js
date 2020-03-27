module.exports = {
  roots: ["<rootDir>/app/backend/src", "<rootDir>/app/backend/test"],
  transform: {
    "^.+\\.tsx?$": "ts-jest"
  },
  testRegex: "(/__tests__/.*|(\\.|/)(test|spec))\\.tsx?$",
  moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node"],
  preset: "ts-jest/presets/js-with-ts"
};
