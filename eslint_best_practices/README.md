# Eslint Seminar

## Resources

- [How to add rules and plugins](https://eslint.org/docs/user-guide/configuring)

- [How to add/remove rules](https://eslint.org/docs/2.0.0/user-guide/configuring#configuring-rules)

- [How to add plugins](https://eslint.org/docs/2.0.0/user-guide/configuring#configuring-rules)

- [Awesome Eslint](https://github.com/dustinspecker/awesome-eslint)

- [Editor Plugins](https://eslint.org/docs/user-guide/integrations#editors)

- [Rule List](https://eslint.org/docs/rules/)

- [Husky configuration](https://medium.com/gits-apps-insight/utilizing-git-hook-by-using-eslint-husky-and-lint-staged-18b6f6f60f1e)

## Examples

```json
{
  "extends": "eslint:recommended",
  "rules": {
      "consistent-return": 2,
      "indent"           : [1, 4],
      "no-else-return"   : 1,
      "semi"             : [1, "always"],
      "space-unary-ops"  : 2
  }
}
```


## Exercises

1. Fill .eslintrc file with the **rules, environments and plugins** that you consider appropriated to get
force consistency and good practices for this project.

To make it more interesting the configuration file should have at least the following:

- A custom formatter, for example *table*.
- More than one environment
- More than 5 custom rules.
- One or more recommended rules extensions

2. Setup Husky to execute eslint before a commit is created (hook pre-commit).
