module.exports = {
    roots: ['<rootDir>/__tests__'],
    testMatch: ['**/?(*.)+(spec|test).+(ts|tsx|js)'],
    transform: {
        '^.+\\.(ts|tsx)$': 'ts-jest'
    },
    moduleNameMapper: {
        '\\.(css|less|sass|scss)$': '<rootDir>/__mocks__/styleMock.js',

        // For some reason this positioning import was causing all tests to fail so we are mocking it in our tests.
        'office-ui-fabric-react/lib/utilities/positioning': '<rootDir>/__mocks__/positioningMock.js'
    },
    transformIgnorePatterns: ['<rootDir>/node_modules/'],
    setupFilesAfterEnv: ['<rootDir>/__tests__/_testsConfig.ts']
};
