
https://www.npmjs.com/package/google-documents-api — Google Docs API
https://github.com/punkave/sanitize-html - Clean HTML
https://github.com/NotNinja/node-europa - HTML 2 MD
https://github.com/showdownjs/showdown - MD 2 HTML

## Anti-slop lint

Use Node 24. Install the isolated lint dependencies with `npm ci --prefix tools/oxlint`, then run `npm run lint:anti-slop` from the repository root. CI runs the same check on pushes and pull requests. Application dependencies are not needed for this check.

All 18 generic anti-slop rules and `oxc/no-accumulating-spread` are errors. Existing findings are reported without changing application code. Source revision and licenses are recorded in [UPSTREAM.md](tools/oxlint/anti-slop/UPSTREAM.md).
