# TODO

Open work only. Delete items when they ship; [CHANGELOG.md](CHANGELOG.md) is the record of what was done.

- Clear the moderate minimatch finding from `npm audit` ([GHSA-g3hv-75wg-m249](https://github.com/advisories/GHSA-g3hv-75wg-m249)) once `@typescript-eslint/typescript-estree` accepts minimatch 11 (8.72.2 still requires `^10.2.2`): update `eslint-config-next` or `typescript-eslint`, then check that `npm audit` is clean. It only affects ESLint, not the site.

