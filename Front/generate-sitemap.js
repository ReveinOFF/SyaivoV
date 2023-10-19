const fs = require("fs");

const baseUrl = "http://syaivo.rivne.ua";

const paths = [
  { path: "/", changefreq: "weekly", priority: 1 },
  { path: "/catalog", changefreq: "never", priority: 0.8 },
  { path: "/catalog/protected", changefreq: "weekly", priority: 0.8 },
  { path: "/catalog/boots", changefreq: "weekly", priority: 0.8 },
  { path: "/catalog/clothing", changefreq: "weekly", priority: 0.8 },
  { path: "/products", changefreq: "weekly", priority: 0.8 },
  { path: "/products/gloves", changefreq: "weekly", priority: 0.8 },
  { path: "/products/household", changefreq: "weekly", priority: 0.8 },
  { path: "/products/embroidery", changefreq: "weekly", priority: 0.8 },
  { path: "/products/clothing", changefreq: "weekly", priority: 0.8 },
  { path: "/products/boots", changefreq: "weekly", priority: 0.8 },
  { path: "/products/protected", changefreq: "weekly", priority: 0.8 },
  { path: "/contact", changefreq: "never", priority: 0.8 },
  { path: "/company", changefreq: "never", priority: 0.8 },
  { path: "/size", changefreq: "never", priority: 0.8 },
  { path: "/size/clothing", changefreq: "never", priority: 0.8 },
  { path: "/size/boots", changefreq: "never", priority: 0.8 },
];

const xmlData = `<?xml version="1.0" encoding="UTF-8"?>
  <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
    ${paths
      .map(
        (item) => `
      <url>
        <loc>${baseUrl}${item.path}</loc>
        <changefreq>${item.changefreq}</changefreq>
        <priority>${item.priority}</priority>
      </url>
    `
      )
      .join("")}
  </urlset>`;

fs.writeFileSync("build/sitemap.xml", xmlData);
