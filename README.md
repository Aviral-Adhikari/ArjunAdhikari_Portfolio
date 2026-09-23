# Advocate Arjun Adhikari Portfolio

A responsive bilingual portfolio built with plain HTML, CSS, and JavaScript.

## Run locally

From the project directory, serve the `dist` folder with any static server. For example:

```powershell
python -m http.server 8765 --directory dist
```

Then open `http://127.0.0.1:8765/`.

## Update site content

- `dist/content.js` contains services, experience, education, training, FAQ content, and both language versions.
- `dist/app.js` contains interface translations and behaviour.
- `dist/index.html` contains page structure, SEO metadata, contact details, and structured data.
- `dist/styles.css` contains the visual design and responsive rules.
- `content/owner-review.json` lists facts that still require owner confirmation.
- `.private/owner-profile.private.json` retains personal CV fields outside the deployed `dist` directory. Do not move this file into `dist`.

## Contact form integration

The form validates locally but deliberately does not claim to send until a form endpoint is configured.

1. Create a form endpoint with a provider such as Formspree, Basin, or your own serverless handler.
2. Add server-side spam protection, rate limiting, and an allowlist for the website origin.
3. In `dist/content.js`, set `formEndpoint` to the provider endpoint URL.
4. Never place private API keys or server credentials in files under `dist`.
5. Submit a real test and confirm receipt before publishing the enabled form.

## Deployment

The publishable directory is `dist`. Upload that directory to any static host, or use the existing Sites configuration in `.openai/hosting.json`.

## Owner material still needed

- Confirmation of the UNICEF project date range
- Confirmation of the FAO project end date
- Year of the FMDI cooperative governance training
- Preferred public office address
- A professional portrait and/or brand logo, if desired
