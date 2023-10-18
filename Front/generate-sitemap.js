const fs = require("fs");

const baseUrl = "http://syaivo.rivne.ua";

const paths = [
  "/",
  "/catalog",
  "/products",
  "/contact",
  "/company",
  "/size",
  "/size/clothing",
  "/size/boots",
];

const xmlData = `<?xml version="1.0" encoding="UTF-8"?>
  <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
    ${paths
      .map(
        (path) => `
      <url>
        <loc>${baseUrl}${path}</loc>
        <changefreq>weekly</changefreq>
        <priority>0.8</priority>
      </url>
    `
      )
      .join("")}
  </urlset>`;

fs.writeFileSync("build/sitemap.xml", xmlData);
