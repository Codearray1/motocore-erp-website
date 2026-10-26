// Markdown → HTML for blog posts, shared by the build (scripts/blog-md.mjs) and the admin preview.
// Posts are written in the admin, so treat them as untrusted: raw HTML is shown as text and only
// http(s), mailto, tel, site-relative and #anchor URLs are kept.
import { Marked } from 'marked';

const escapeHtml = (t) => t.replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]);
const SAFE_URL = /^(https?:|mailto:|tel:|\/(?!\/)|#)/i;

const md = new Marked({
  renderer: { html: ({ text }) => escapeHtml(text) },
  walkTokens(token) {
    if ((token.type === 'link' || token.type === 'image') && !SAFE_URL.test(token.href.trim())) token.href = '#';
  },
});

/** @param {string} source @returns {string} */
export const renderMarkdown = (source) => /** @type {string} */ (md.parse(source, { async: false }));
