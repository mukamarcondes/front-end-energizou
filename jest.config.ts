/*
 * For a detailed explanation regarding each configuration property and type check, visit:
 * https://jestjs.io/docs/configuration
 */

export default {
  coverageProvider: "v8",
  preset: "ts-jest",
  runner: "jest-runner",
  setupFilesAfterEnv: ["./jest-preload-env.ts"],
  testMatch: [
    "**/__tests__/**/*.test.[jt]s?(x)",
    "**/?(*.)+(spec|test).[tj]s?(x)",
  ],
  verbose: false,
};
