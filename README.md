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

## News management

1. Open [Pages CMS](https://app.pagescms.org/) and sign in with GitHub.
2. Select the CNU-FPL repository and open **News**.
3. Create or edit an article.
4. Enter its title, date, category, summary, and content.
5. Upload a featured image if desired, then set **Featured** as needed.
6. Save/publish the change through Pages CMS.
7. GitHub Actions rebuilds and deploys the website after the change reaches `main`.
8. The News page and Home Latest News update automatically.

News articles are individual Markdown files in `src/content/news/`. News images are stored in `public/images/news/`. Only authorized GitHub repository users should be given write access.
