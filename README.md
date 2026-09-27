# Advocate Arjun Adhikari Portfolio

A responsive bilingual portfolio and blog built with plain HTML, CSS, and JavaScript.

## Project layout

The working website now lives directly in the repository root:

- `index.html` — portfolio structure, SEO metadata and contact details
- `blogs.html` — dedicated searchable blog archive
- `content.js` — services, experience, education, training and FAQ content
- `blog-posts.js` — published blog articles
- `app.js`, `blog-page.js`, `preloader.js` — interactions and language behaviour
- `styles.css`, `fullscreen.css`, `refinements.css`, `blog-page.css` — visual and responsive design
- `assets/` — public images and animated assets

`dist/` remains the deployment mirror because `.openai/hosting.json` is configured to publish that supported static directory.

## Run locally

From the repository root:

```powershell
python -m http.server 8765 --directory .
```

Then open `http://127.0.0.1:8765/index.html` or `http://127.0.0.1:8765/blogs.html`.

## Update and deploy

Edit the files in the repository root. Before deploying through the existing Sites configuration, mirror the public root files into `dist`:

```powershell
.\sync-to-dist.ps1
```

The script copies only the public website files and assets. It does not copy `.private/`, project notes or repository metadata.

## Blog publishing

See `BLOGGING.md`. New posts are added to `blog-posts.js`; the archive, search, filters and article reader update automatically.

## Contact form integration

The form validates locally but deliberately does not claim to send until a secure form endpoint is configured.

1. Create a form endpoint with a provider such as Formspree, Basin, or a serverless handler.
2. Add server-side spam protection, rate limiting and an allowlist for the website origin.
3. In `content.js`, set `formEndpoint` to the endpoint URL.
4. Run `sync-to-dist.ps1` before deployment.
5. Never place private API keys or server credentials in public files.

## Private and review material

- `content/owner-review.json` lists facts that still require owner confirmation.
- `.private/owner-profile.private.json` retains personal CV fields outside the public website. Never copy it into `dist` or `assets`.

