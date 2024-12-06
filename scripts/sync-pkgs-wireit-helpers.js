function unique(arr) {
  return [...new Set(arr)];
}
function concat(...arrays) {
  return unique([].concat(...arrays));
}

function generateWireitConfig(pkg, rootPkg) {
  const isVictoryPackage = (p) => p.startsWith("victory") && p !== pkg.name;
  const deps = Object.keys(pkg.dependencies || {}).filter(isVictoryPackage);
  const devDeps = Object.keys(pkg.devDependencies || {}).filter(
    isVictoryPackage,
  );
  const rootDeps = Object.keys(rootPkg.devDependencies).filter(
    isVictoryPackage,
  );
  const lintDeps = [
    ...concat(deps, devDeps, rootDeps).map((dep) => `../${dep}:types:create`),
  ];

  // We want this block to look like JSON, so disable prettier:
  // prettier-ignore
  return {
    "scripts": {
      "###            THESE SCRIPTS ARE GENERATED           ###": "true",
      "###            DO NOT MODIFY THESE MANUALLY          ###": "true",
      "build": "wireit",
      "build:lib": "wireit",
      "build:lib:esm": "wireit",
      "build:lib:cjs": "wireit",
      "build:dist": "wireit",
      "build:dist:dev": "wireit",
      "build:dist:min": "wireit",
      "check": "wireit",
      "types:check": "wireit",
      "types:create": "wireit",
      "lint": "wireit",
      "lint:fix": "wireit",
      "jest": "wireit",
    },
    "wireit": {
      "###            THESE WIREIT CONFIGS ARE GENERATED        ####": {},
      "###            DO NOT MODIFY THESE MANUALLY              ####": {},
      "build": {
        "dependencies": [
          "build:lib",
          "build:dist",
          "types:create"
        ],
      },
      "build:lib": {
        "dependencies": [
          "build:lib:esm",
          "build:lib:cjs"
        ],
      },
      "build:lib:esm": {
        "command": "nps build:lib:esm",
        "files": [
          "src/**",
          "!src/**/*.test.*",
          "../../.babelrc.build.js",
          "../../.babelrc.js",
          "../../package-scripts.js",
        ],
        "output": [
          "es/**/*.js",
          "es/**/*.js.map"
        ],
        "dependencies": [
          ...deps.map((dep) => `../${dep}:build:lib:esm`)
        ],
        "packageLocks": ["pnpm-lock.yaml"]
      },
      "build:lib:cjs": {
        "command": "nps build:lib:cjs",
        "files": [
          "src/**",
          "!src/**/*.test.*",
          "../../.babelrc.build.js",
          "../../.babelrc.js",
          "../../package-scripts.js",
        ],
        "output": [
          "lib/**/*.js",
          "lib/**/*.js.map"
        ],
        "dependencies": [
          ...deps.map((dep) => `../${dep}:build:lib:cjs`)
        ],
        "packageLocks": ["pnpm-lock.yaml"]
      },
      "build:dist": {
        "dependencies": [
          "build:dist:dev",
          "build:dist:min"
        ],
      },
      "build:dist:dev": {
        "command": "nps build:dist:dev",
        "files": [
          "src/**",
          "!src/**/*.test.*",
          "../../.babelrc.build.js",
          "../../.babelrc.js",
          "../../package-scripts.js",
          "../../config/webpack.config.js",
          "../../config/webpack.config.dev.js",
        ],
        "output": [
          "dist/victory*.js",
          "!dist/victory*.min.js*",
        ],
        // Webpack uses:
        // 1. Source (`src`) of package being built.
        // 2. The ESM version of dependencies specified in our
        //    `package.json:module` fields.
        "dependencies": [
          ...deps.map((dep) => `../${dep}:build:lib:esm`)
        ],
        "packageLocks": ["pnpm-lock.yaml"]
      },
      "build:dist:min": {
        "command": "nps build:dist:min",
        "files": [
          "src/**",
          "!src/**/*.test.*",
          "../../.babelrc.build.js",
          "../../.babelrc.js",
          "../../package-scripts.js",
          "../../config/webpack.config.js",
        ],
        "output": [
          "dist/victory*.min.js*"
        ],
        "dependencies": [
          ...deps.map((dep) => `../${dep}:build:lib:esm`)
        ],
        "packageLocks": ["pnpm-lock.yaml"]
      },
      "check": {
        "dependencies": [
          "types:check",
          "jest",
          "format",
          "lint",
        ]
      },
      "types:check": {
        "command": "nps types:pkg:check",
        "files": [
          "src/**/*.{ts,tsx}",
          "../../tsconfig.base.json",
          "tsconfig.json",
        ],
        "dependencies": [
          "types:create",
          ...concat(deps, devDeps, rootDeps)
            .map((dep) => `../${dep}:types:create`),
        ],
        "output": [],
        "packageLocks": ["pnpm-lock.yaml"]
      },
      "types:create": {
        "command": "nps types:pkg:create",
        "files": [
          "src/**",
          "!src/**/*.test.*",
          "../../tsconfig.base.json",
          "tsconfig.build.json",
        ],
        "output": [
          "es/**/*.d.ts",
          "es/**/*.d.ts.map",
          "lib/**/*.d.ts",
          "lib/**/*.d.ts.map",
        ],
        "dependencies": [
          ...deps.map((dep) => `../${dep}:types:create`)
        ],
        "packageLocks": ["pnpm-lock.yaml"]
      },
      // Same as above
      ...["lint", "lint:fix"].reduce((wireit, key) => {
        wireit[key] = {
          "command": key === "lint" ? "eslint src" : "eslint --fix src",
          "files": [
            "src/**",
          ],
          "output": [],
          "dependencies": [
            ...lintDeps,
          ],
          "packageLocks": ["pnpm-lock.yaml"]
        };

        return wireit;
      }, {}),

      "jest": {
        "command": "jest --passWithNoTests",
        "files": [
          "src/**/*.test.*",
          "../../.babelrc.js",
          "../../test/jest-config.js",
          "../../test/jest-setup.ts",
        ],
        "output": [],
        // Jest uses:
        // 1. Source (`src`) for actual test files within a package.
        // 2. The CommonJS (`lib`) versions of library files (dependencies
        //    and the package at issue).
        "dependencies": [
          ...concat(deps, devDeps, rootDeps).map((dep) => `../${dep}:build`),
        ],
        "packageLocks": ["pnpm-lock.yaml"]
      },
    },
  };
}

module.exports = { generateWireitConfig };
