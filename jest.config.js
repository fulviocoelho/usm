module.exports = {
    verbose: true,
    moduleNameMapper: {
      "^@scripts(.*)$": "<rootDir>/scripts$1",
      "^@node(.*)$": "<rootDir>/scripts/node$1"
    }
}