# Anti-slop provenance

- Source: https://github.com/dmmulroy/anti-slop
- Commit: `c44ef22ca116d0ba62a3ff663a0bd13a3f3fa40b`
- Snapshot: upstream `src/` copied unchanged to `tools/oxlint/anti-slop/`.
- Upstream root MIT license is copied as `LICENSE`. The nested ESLint Stylistic license and provenance remain included.
- No rule implementation changes. All 18 generic rules and native `oxc/no-accumulating-spread` are errors.
- Effect rules are not registered: the application has no direct Effect dependency.
- Oxlint and `@oxlint/plugins` are both pinned to `1.87.0` in the private tooling package.

The private tooling package isolates current lint dependencies from the legacy application dependency tree. Install it with the repository's package manager, then run the root `lint:anti-slop` script. CI runs that script on Node 24. Existing application dependencies, locks, and lint checks stay in place.

Oxlint checks supported standalone JavaScript, JSX, TypeScript and Vue script blocks. It does not check arbitrary inline scripts in HTML or Vue templates. Vendored tooling, dependencies, generated output, and agent tooling are excluded.
