module.exports = {
  defaultSeverity: "error",
  extends: ["tslint:recommended", "tslint-config-prettier"],
  jsRules: {},
  rules: {
    "interface-name": [true, "never-prefix"],
    "ordered-imports": false,
    "object-literal-sort-keys": false,
    "max-classes-per-file": false,
    "no-string-literal": false
  },
  rulesDirectory: []
};
