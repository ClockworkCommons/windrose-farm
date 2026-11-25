import { getCollection } from 'astro:content';

export async function GET(context) {
  const site = context.site.href.replace(/\/$/, '');
  const entries = await getCollection('journal');
  const paths = ['/', '/story/', '/land/', '/farm/', '/seasons/', '/journal/'].concat(
    entries.map((e) => `/journal/${e.id}/`)
  );
  const urls = paths.map((p) => `  <url><loc>${site}${p}</loc></url>`).join('\n');
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>
`;
  return new Response(xml, { headers: { 'Content-Type': 'application/xml; charset=utf-8' } });
}
