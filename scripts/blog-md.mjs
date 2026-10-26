// Vite plugin: `import x from "./post.md?post"` gives { frontmatter, html, words }, parsed at build time
// so the browser bundle carries no Markdown or YAML parser.
import { readFileSync } from 'node:fs';
import { parse as parseYaml } from 'yaml';
import { renderMarkdown } from './markdown.mjs';

export function parsePost(file, raw) {
  const m = raw.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?([\s\S]*)$/);
  if (!m) throw new Error(`${file}: missing --- front matter ---`);
  const frontmatter = parseYaml(m[1]) ?? {};
  for (const k of ['title', 'description', 'date']) if (!frontmatter[k]) throw new Error(`${file}: front matter needs "${k}"`);
  for (const k of ['date', 'updated']) if (frontmatter[k] instanceof Date) frontmatter[k] = frontmatter[k].toISOString();
  return { frontmatter, html: renderMarkdown(m[2]), words: m[2].split(/\s+/).filter(Boolean).length };
}

/** @returns {import('vite').Plugin} */
export default function blogMarkdown() {
  return {
    name: 'motocore-blog-markdown',
    enforce: /** @type {const} */ ('pre'),
    load(id) {
      if (!id.endsWith('.md?post')) return null;
      const file = id.slice(0, -'?post'.length);
      this.addWatchFile(file);
      return `export default ${JSON.stringify(parsePost(file, readFileSync(file, 'utf8')))};`;
    },
  };
}
