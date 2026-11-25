import { getCollection } from 'astro:content';

const esc = (s) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

export async function GET(context) {
  const site = context.site.href.replace(/\/$/, '');
  const entries = (await getCollection('journal')).sort(
    (a, b) => b.data.date.valueOf() - a.data.date.valueOf()
  );

  const items = entries
    .map((e) => {
      const url = `${site}/journal/${e.id}/`;
      return [
        '    <item>',
        `      <title>${esc(e.data.title)}</title>`,
        `      <link>${url}</link>`,
        `      <guid>${url}</guid>`,
        `      <pubDate>${e.data.date.toUTCString()}</pubDate>`,
        `      <description>${esc(e.data.summary)}</description>`,
        '    </item>',
      ].join('\n');
    })
    .join('\n');

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0">
  <channel>
    <title>Windrose Farm Journal</title>
    <link>${site}/journal/</link>
    <description>Dated notes from Windrose Farm, a homestead in Arizona's high desert.</description>
    <language>en-us</language>
${items}
  </channel>
</rss>
`;

  return new Response(xml, { headers: { 'Content-Type': 'application/rss+xml; charset=utf-8' } });
}
