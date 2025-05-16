import nx from "@nx/eslint-plugin";
import angular from "angular-eslint";
import prettier from "eslint-config-prettier";
import eslintPluginPrettier from "eslint-plugin-prettier";

export default [
  ...nx.configs["flat/base"],
  ...nx.configs["flat/typescript"],
  ...nx.configs["flat/javascript"],
  ...angular.configs.tsRecommended,
  prettier,
  {
    ignores: ["**/dist"],
  },
  {
    files: ["**/*.ts", "**/*.tsx", "**/*.js", "**/*.jsx"],
    plugins: {
      prettier: eslintPluginPrettier,
    },
    processor: angular.processInlineTemplates,
    rules: {
      "@nx/enforce-module-boundaries": [
        "error",
        {
          enforceBuildableLibDependency: true,
          allow: ["^.*/eslint(\\.base)?\\.config\\.[cm]?js$"],
          depConstraints: [
            {
              sourceTag: "*",
              onlyDependOnLibsWithTags: ["*"],
            },
          ],
        },
      ],
      "@angular-eslint/component-class-suffix": [
        "error",
        {
          suffixes: ["Component", "Page"],
        },
      ],
    },
  },
  {
    files: [
      "**/*.ts",
      "**/*.tsx",
      "**/*.cts",
      "**/*.mts",
      "**/*.js",
      "**/*.jsx",
      "**/*.cjs",
      "**/*.mjs",
    ],
    // Override or add rules here
    rules: {},
  },
];
