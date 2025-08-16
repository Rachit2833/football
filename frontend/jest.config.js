/** @type {import('jest').Config} */
const config = {
  collectCoverage: true,
  coverageDirectory: "coverage",
   testEnvironment: 'jest-fixed-jsdom',
  setupFilesAfterEnv: ["<rootDir>/vitest.setup.js"],
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/$1",
    "\\.(css|less|scss|sass)$": "identity-obj-proxy"
  },
  transform: {
    "^.+\\.(js|jsx|ts|tsx)$": "babel-jest"
  },
  testPathIgnorePatterns: ["<rootDir>/.next/", "<rootDir>/node_modules/"]
};

module.exports = config;
