# Publishing a new blog post

The public archive is `blogs.html`. Its posts come from `blog-posts.js`, so the layout does not need to be rebuilt when a new article is added.

## Add a post

1. Open `blog-posts.js` in the repository root.
2. Copy one complete post object inside `window.blogPosts = [ ... ]`.
3. Place the copied object at the top of the array.
4. Give it a unique lowercase `slug`, an ISO date (`YYYY-MM-DD`), and English/Nepali category, title, excerpt, read time and body paragraphs.
5. Save and open `blogs.html` to review the post. A post can be opened directly with `blogs.html#your-post-slug`.
6. Run `.\sync-to-dist.ps1` before deploying through the existing Sites configuration.

Example shape:

```js
{
  slug: "clear-short-title",
  date: "2026-09-28",
  category: { en: "Client guide", ne: "सेवाग्राही मार्गदर्शन" },
  title: { en: "English title", ne: "नेपाली शीर्षक" },
  excerpt: { en: "English summary.", ne: "नेपाली सारांश।" },
  readTime: { en: "4 minute read", ne: "४ मिनेट पढाइ" },
  body: {
    en: ["First paragraph.", "Second paragraph."],
    ne: ["पहिलो अनुच्छेद।", "दोस्रो अनुच्छेद।"]
  }
}
```

This is a static website. A secure browser-based publishing dashboard would require authenticated hosting and a content-management backend; do not expose an unprotected admin form on the public site.

