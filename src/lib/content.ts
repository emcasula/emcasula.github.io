import { getCollection } from 'astro:content';

export const serviceUrl = (id: string) => `/servizi/${id}/`;
export async function getPublishedContent() {
  const [allServices, allPosts] = await Promise.all([getCollection('services'), getCollection('blog')]);
  for (const service of allServices) {
    if (!/^[a-z0-9-]+$/.test(service.id)) throw new Error(`Slug servizio non valido: ${service.id}`);
  }
  // References are checked even for drafts: missing targets are authoring errors.
  for (const service of allServices) for (const ref of service.data.relatedArticles) {
    if (!allPosts.some(post => post.id === ref.id)) throw new Error(`Articolo correlato inesistente: ${service.id} → ${ref.id}`);
  }
  for (const post of allPosts) for (const ref of post.data.relatedServices) {
    if (!allServices.some(service => service.id === ref.id)) throw new Error(`Servizio correlato inesistente: ${post.id} → ${ref.id}`);
  }
  const paths = new Set<string>();
  for (const post of allPosts) {
    if (paths.has(post.data.path)) throw new Error(`URL blog duplicato: ${post.data.path}`);
    paths.add(post.data.path);
  }
  return {
    services: allServices.filter(entry => !entry.data.draft).sort((a, b) => a.data.order - b.data.order || a.id.localeCompare(b.id)),
    posts: allPosts.filter(entry => !entry.data.draft).sort((a, b) => b.data.date!.getTime() - a.data.date!.getTime()),
  };
}
export const formatDate = (date: Date) => new Intl.DateTimeFormat('it-IT', { day: '2-digit', month: 'long', year: 'numeric', timeZone: 'UTC' }).format(date);
export const excerpt = (html: string) => {
  const text = html.replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim();
  if (text.length <= 250) return text;
  const short = text.slice(0, 250);
  return `${short.slice(0, short.lastIndexOf(' '))}…`;
};
