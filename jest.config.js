module.exports = {
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['./src/test/setupTests.ts'],
  transform: {
    '^.+\\.[jt]sx?$': 'babel-jest',
    '^.+\\.svg$': 'jest-transformer-svg',
  },
}
