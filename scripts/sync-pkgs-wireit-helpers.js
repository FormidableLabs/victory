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
  // Lint require victory-vendor (if dependend) to be built
  const lintDeps = [
    // victory-vendor has nested path accesses, which means it needs
    // to be built for lint to not error on it if a dependency.
    ...(deps.includes("victory-vendor") ? ["../victory-vendor:build"] : []),
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
      "types:check": "wireit",
      "types:create": "wireit",
      "format": "wireit",
      "format:fix": "wireit",
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
          "../../.babelrc.build.js"
        ],
        "output": [
          "es/**/*.js",
          "es/**/*.js.map"
        ],
        "dependencies": [
          ...deps.map((dep) => `../${dep}:build:lib:esm`)
        ],
      },
      "build:lib:cjs": {
        "command": "nps build:lib:cjs",
        "files": [
          "src/**",
          "!src/**/*.test.*",
          "../../.babelrc.build.js"
        ],
        "output": [
          "lib/**/*.js",
          "lib/**/*.js.map"
        ],
        "dependencies": [
          ...deps.map((dep) => `../${dep}:build:lib:cjs`)
        ],
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
          "../../config/webpack.config.js",
          "../../config/webpack.config.dev.js",
        ],
        "output": [
          "victory*.js",
          "!victory*.min.js*",
        ],
        // Webpack uses:
        // 1. Source (`src`) of package being built.
        // 2. The ESM version of dependencies specified in our
        //    `package.json:module` fields.
        "dependencies": [
          ...deps.map((dep) => `../${dep}:build:lib:esm`)
        ],
      },
      "build:dist:min": {
        "command": "nps build:dist:min",
        "files": [
          "src/**",
          "!src/**/*.test.*",
          "../../.babelrc.build.js",
          "../../config/webpack.config.js",
        ],
        "output": [
          "victory*.min.js*"
        ],
        "dependencies": [
          ...deps.map((dep) => `../${dep}:build:lib:esm`)
        ],
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
      },
      // lint/format + fix
      // For the "fix" task, we first run the normal check that may fail so that
      // we get caching for packages without changed files.
      ...["", ":fix"].reduce((acc, key) => {
        acc[`format${key}`] = {
          "command": key === "" ? "nps format:pkg" : "pnpm run lint || nps format:pkg:fix",
          "files": [
            "src/**",
            "*.json",
            "../../.prettierignore",
            "../../.prettierrc.json",
          ],
          "output": [],
        };

        acc[`lint${key}`] = {
          "command": key === "" ? "nps lint:pkg" : "pnpm run lint || nps lint:pkg:fix",
          "files": [
            "src/**",
            "../../.eslintignore",
            "../../.eslintrc.js"
          ],
          "output": [],
          "dependencies": [
            ...lintDeps,
          ],
        };

        return acc;
      }, {}),
      "jest": {
        "command": "nps jest:pkg",
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
          "build:lib:cjs",
          ...concat(devDeps, rootDeps).map((dep) => `../${dep}:build:lib:cjs`),
        ],
      },
    },
  };
}

module.exports = { generateWireitConfig };
