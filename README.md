# CNU-FPL

CNU-FPL is a laboratory homepage project maintained with VS Code, Codex, Git, and GitHub.

Commit changes before and after major modifications.

## Publication update workflow

1. Open `data/publications.xlsx` and edit the `Master_DB` sheet.
2. Save and close Excel.
3. Run `npm run publications`.
4. Check `/publications` locally.
5. Before deployment, run `npm run build`.

`src/data/publications.js` is generated automatically and should not be edited manually.
