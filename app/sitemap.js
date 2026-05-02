const SITE = process.env.NEXT_PUBLIC_SITE_URL || "https://ventureuniverse.vercel.app";

export default function sitemap() {
  const routes = [
    "",
    "/news",
    "/articles",
    "/launches",
    "/iss",
    "/sky-tonight",
    "/missions",
    "/isro",
    "/bookmarks",
    "/contact",
  ];
  const now = new Date().toISOString();
  return routes.map((path) => ({
    url: `${SITE}${path}`,
    lastModified: now,
    changeFrequency: path === "" ? "daily" : "weekly",
    priority: path === "" ? 1 : 0.7,
  }));
}
