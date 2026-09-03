import { readdirSync, readFileSync } from 'node:fs';
import { join } from 'node:path';
import matter from 'gray-matter';
import MarkdownIt from 'markdown-it';

const blogDirectory = join(process.cwd(), 'src/data/blog');
const markdown = new MarkdownIt({ html: true });

/**
 * @typedef {object} BlogFrontmatter
 * @property {string} path
 * @property {string} date
 * @property {string} title
 * @property {string} cover
 */

/**
 * @typedef {object} BlogPost
 * @property {string} id
 * @property {string} html
 * @property {string} excerpt
 * @property {number} timestamp
 * @property {BlogFrontmatter} frontmatter
 */

const formatDate = value =>
  new Intl.DateTimeFormat('it-IT', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
    timeZone: 'UTC',
  }).format(new Date(value));

const makeExcerpt = html => {
  const text = html
    .replace(/<[^>]*>/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();

  if (text.length <= 250) return text;
  const excerpt = text.slice(0, 250);
  return `${excerpt.slice(0, excerpt.lastIndexOf(' '))}…`;
};

/** @returns {BlogPost[]} */
export function getBlogPosts() {
  return readdirSync(blogDirectory, { withFileTypes: true })
    .filter(entry => entry.isDirectory())
    .map(entry => {
      const sourcePath = join(blogDirectory, entry.name, 'index.md');
      const { data, content } = matter(readFileSync(sourcePath, 'utf8'));
      const frontmatter = /** @type {BlogFrontmatter} */ (data);
      const html = markdown.render(content);

      return {
        id: frontmatter.path,
        html,
        excerpt: makeExcerpt(html),
        timestamp: new Date(frontmatter.date).getTime(),
        frontmatter: {
          ...frontmatter,
          date: formatDate(frontmatter.date),
        },
      };
    })
    .sort((a, b) => b.timestamp - a.timestamp);
}
