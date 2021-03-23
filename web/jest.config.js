module.exports = {
  roots: ['<rootDir>/tests'],
  collectCoverageFrom: [
    '**/tests/**/*.{js,jsx,ts,tsx}',
    '!**/*.d.ts',
    '!**/node_modules/**'
  ],
  setupFilesAfterEnv: ['<rootDir>/setupTests.js'],
  testPathIgnorePatterns: ['/node_modules/', '/.next/', 'setupTests.js'],
  transform: {
    '^.+\\.(js|jsx|ts|tsx)$': 'babel-jest',
    '^.+\\.scss$': '<rootDir>/tests/config/jest/scssTransform.js'
  },
  transformIgnorePatterns: ['/node_modules/'],
  moduleNameMapper: {
    '^.+\\.(css|sass|scss)$': 'identity-obj-proxy'
  }
}
