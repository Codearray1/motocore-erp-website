// Writes one fully rendered HTML file per route into dist/ (after `vite build` and the SSR build), plus sitemap.xml
// and robots.txt. Search engines and link previews then get the real text, title and metadata of every page.
import { readFileSync, writeFileSync, mkdirSync, rmSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const dist = join(root, 'dist');
const { render, ROUTES } = await import(pathToFileURL(join(root, 'dist-ssr', 'entry-server.js')).href);
const ORIGIN = 'https://www.motocoreerp.com';

const template = readFileSync(join(dist, 'index.html'), 'utf8');
// Everything between <head> and the built asset tags that the template's own SEO block owns is replaced per route
const HEAD_START = '<!--seo-head-->';
const HEAD_END = '<!--/seo-head-->';
if (!template.includes(HEAD_START) || !template.includes(HEAD_END) || !template.includes('<div id="root"></div>')) {
  throw new Error('dist/index.html is missing the <!--seo-head--> markers or the empty #root');
}

// Entrance animations start at opacity:0 (motion `initial`). In static HTML that would be invisible text, so the
// pre-rendered markup shows the final state; the client animations still run after hydration.
const visible = (html) =>
  html.replace(/ style="([^"]*)"/g, (m, css) => {
    const kept = css
      .split(';')
      .filter((d) => d.trim() && !/^\s*(opacity\s*:\s*0(\.0+)?\s*|transform\s*:.*|filter\s*:\s*blur.*)$/i.test(d))
      .join(';');
    return kept ? ` style="${kept}"` : '';
  });

const lastmod = new Date().toISOString().slice(0, 10);
for (const route of ROUTES) {
  const { html, head } = render(route);
  const page = template
    .replace('<html lang="en">', `<html lang="${route.lang}">`)
    .replace(new RegExp(`${HEAD_START}[\\s\\S]*?${HEAD_END}`), `${HEAD_START}\n    ${head}\n    ${HEAD_END}`)
    .replace('<div id="root"></div>', `<div id="root">${visible(html)}</div>`);
  // Flat files: Vercel's cleanUrls serves /bike-showroom-software from bike-showroom-software.html (no trailing slash)
  const out = route.path === '/' ? join(dist, 'index.html') : join(dist, `${route.path.slice(1)}.html`);
  mkdirSync(dirname(out), { recursive: true });
  writeFileSync(out, page);
  console.log(`prerendered ${route.path.padEnd(48)} ${(page.length / 1024).toFixed(1)} KB`);
}

const urls = ROUTES.map((r) => {
  const alt = (lang, p) => `    <xhtml:link rel="alternate" hreflang="${lang}" href="${ORIGIN}${p}"/>`;
  return [
    '  <url>',
    `    <loc>${ORIGIN}${r.path}</loc>`,
    `    <lastmod>${lastmod}</lastmod>`,
    alt('en', r.alternates.en),
    alt('ne', r.alternates.ne),
    alt('x-default', r.alternates.en),
    '  </url>',
  ].join('\n');
});
writeFileSync(
  join(dist, 'sitemap.xml'),
  `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">\n${urls.join('\n')}\n</urlset>\n`,
);
writeFileSync(join(dist, 'robots.txt'), `User-agent: *\nAllow: /\nDisallow: /api/\n\nSitemap: ${ORIGIN}/sitemap.xml\n`);
rmSync(join(root, 'dist-ssr'), { recursive: true, force: true });
console.log(`sitemap.xml (${ROUTES.length} URLs) and robots.txt written`);
