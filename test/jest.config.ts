// paths are relative to the root of the package they are executed in
const jestConfig = {
  preset: "ts-jest",
  testEnvironment: "jsdom",
  testMatch: ["**/src/**/?(*.)+(spec|test).[jt]s?(x)"],
  setupFilesAfterEnv: ["../../test/jest-setup.ts"],
};

export default jestConfig;
