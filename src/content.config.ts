import { defineCollection, reference } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const text = z.string().trim().min(1);
const services = defineCollection({
  loader: glob({ pattern: '*.json', base: './src/data/services', generateId: ({ entry }) => entry.replace(/\.json$/, '') }),
  schema: z.object({
    title: text, description: text, seoTitle: text, seoDescription: text,
    heading: text, label: text, intro: text, order: z.number().int().positive(),
    draft: z.boolean().default(false),
    relatedArticles: z.array(reference('blog')).default([]),
  }),
});
const blog = defineCollection({
  loader: glob({ pattern: '**/index.md', base: './src/data/blog', generateId: ({ entry }) => entry.replace(/\/index\.md$/, '') }),
  schema: z.object({
    path: z.string().regex(/^\/[a-z0-9-]+\/$/), title: text,
    description: text.optional(), date: z.coerce.date().optional(),
    dateModified: z.coerce.date().optional(), cover: z.string().optional(),
    draft: z.boolean().default(false),
    relatedServices: z.array(reference('services')).default([]),
  }).superRefine((data, ctx) => {
    if (!data.draft && !data.date) ctx.addIssue({ code: 'custom', path: ['date'], message: 'Un articolo pubblicato richiede la data originale.' });
  }),
});
export const collections = { services, blog };
