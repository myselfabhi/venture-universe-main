// Aggregated RSS feed pulling from the Spaceflight News API + APOD.

const SITE = process.env.NEXT_PUBLIC_SITE_URL || "https://ventureuniverse.vercel.app";

const escape = (s = "") =>
  s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");

export async function GET() {
  let items = [];
  try {
    const r = await fetch(
      "https://api.spaceflightnewsapi.net/v4/articles/?limit=20&ordering=-published_at",
      { next: { revalidate: 600 } }
    );
    if (r.ok) {
      const data = await r.json();
      items = (data.results || []).map((a) => ({
        title: a.title,
        link: a.url,
        pubDate: a.published_at,
        description: a.summary,
        source: a.news_site,
      }));
    }
  } catch {
    // graceful empty feed
  }

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0">
  <channel>
    <title>Venture Universe</title>
    <link>${SITE}</link>
    <description>Space news, missions, and cosmic discoveries — aggregated.</description>
    <language>en</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
${items
  .map(
    (i) => `    <item>
      <title>${escape(i.title)}</title>
      <link>${escape(i.link)}</link>
      <pubDate>${new Date(i.pubDate).toUTCString()}</pubDate>
      <description>${escape(i.description || "")}</description>
      <source>${escape(i.source || "")}</source>
    </item>`
  )
  .join("\n")}
  </channel>
</rss>`;

  return new Response(xml, {
    headers: {
      "Content-Type": "application/rss+xml; charset=utf-8",
      "Cache-Control": "public, s-maxage=600, stale-while-revalidate=1800",
    },
  });
}
