// scripts/generate-sitemap.js
// ✅ Automatically builds sitemap.xml for SEO during production

const fs = require("fs");
const path = require("path");

// === Base domain of your live website ===
const BASE_URL = "https://financecalc-demo.vercel.app";

// === Define all pages to include ===
// You can add new calculators or pages here anytime.
const pages = [
  "",
  "loan",
  "savings",
  "investment",
  "mortgage",
  "compound-interest",
  "roi",
  "debt-to-income",
  "credit-card-payoff"
];

// === Generate the XML entries ===
const urls = pages
  .map((page) => {
    const loc = `${BASE_URL}${page ? `/${page}` : ""}`;
    return `
  <url>
    <loc>${loc}</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>${page === "" ? "1.0" : "0.8"}</priority>
  </url>`;
  })
  .join("\n");

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset
  xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
  xmlns:xhtml="http://www.w3.org/1999/xhtml"
>
${urls}
</urlset>`;

// === Output the file to public/sitemap.xml ===
const publicPath = path.join(__dirname, "..", "public", "sitemap.xml");
fs.writeFileSync(publicPath, sitemap);

console.log("✅ Sitemap successfully generated at /public/sitemap.xml");
