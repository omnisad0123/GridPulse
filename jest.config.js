module.exports = {
  rootDir: './backend',
  testEnvironment: 'node',
  testMatch: ['**/test/**/*.spec.ts'],
  moduleFileExtensions: ['js', 'json', 'ts'],
  transform: {
    '^.+\\.(t|j)s$': 'ts-jest'
  }
};
