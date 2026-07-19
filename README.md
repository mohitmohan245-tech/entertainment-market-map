Entertainment Market Map

An interactive, continuously updatable map of the entertainment industry: spaces, sub-spaces, companies, and key problems.

Structure: data/taxonomy.json is the source of truth (edit this to add or change spaces, sub-spaces, companies, or problems). data/types.ts holds the TypeScript types. components/MarketMap.tsx is the interactive UI. app/page.tsx renders the map from taxonomy.json.

Local development: run npm install then npm run dev, and open http://localhost:3000.

Deploying to Vercel: push this folder to a GitHub repo, go to vercel.com/new and import the repo, use the Next.js preset (auto-detected, no env vars needed), and deploy.

To update the map later, edit data/taxonomy.json, commit, and push. Vercel redeploys automatically.
