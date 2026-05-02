import Link from "next/link";
import { Rss } from "lucide-react";
import { mySocials } from "../constants";

const footerLinks = [
  {
    heading: "Explore",
    items: [
      { label: "Home", href: "/" },
      { label: "Live ISS", href: "/iss" },
      { label: "Sky Tonight", href: "/sky-tonight" },
      { label: "Missions", href: "/missions" },
    ],
  },
  {
    heading: "Read",
    items: [
      { label: "News", href: "/news" },
      { label: "Articles", href: "/articles" },
      { label: "ISRO Odyssey", href: "/isro" },
      { label: "Bookmarks", href: "/bookmarks" },
    ],
  },
  {
    heading: "Connect",
    items: [
      { label: "Contact", href: "/contact" },
      { label: "RSS feed", href: "/feed.xml" },
      { label: "Sitemap", href: "/sitemap.xml" },
    ],
  },
];

const Footer = () => {
  return (
    <footer className="c-space mt-12 pt-12 pb-8 border-t border-white/10">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-10">
        <div className="col-span-2">
          <h3 className="text-lg font-bold mb-2 bg-gradient-to-r from-aqua to-lavender bg-clip-text text-transparent">
            Venture Universe
          </h3>
          <p className="text-sm text-neutral-400 max-w-xs">
            Your gateway to the cosmos — live trackers, mission dossiers, and the latest from
            beyond Earth.
          </p>
          <div className="flex gap-3 mt-4">
            {mySocials.map((social, index) => (
              <a
                href={social.href}
                key={index}
                aria-label={social.name}
                className="p-2 rounded-full vu-glass hover:bg-white/15 transition"
              >
                <img
                  src={social.icon.startsWith("/") ? social.icon : `/${social.icon}`}
                  className="w-4 h-4"
                  alt=""
                />
              </a>
            ))}
            <a
              href="/feed.xml"
              aria-label="RSS feed"
              className="p-2 rounded-full vu-glass hover:bg-white/15 transition"
            >
              <Rss className="w-4 h-4 text-orange" />
            </a>
          </div>
        </div>

        {footerLinks.map((col) => (
          <div key={col.heading}>
            <h4 className="text-xs uppercase tracking-widest text-neutral-500 mb-3">
              {col.heading}
            </h4>
            <ul className="space-y-2">
              {col.items.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-sm text-neutral-300 hover:text-white transition"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="flex flex-wrap items-center justify-between gap-4 pt-6 border-t border-white/5 text-xs text-neutral-500">
        <p>© {new Date().getFullYear()} Venture Universe. Built for cosmic curiosity.</p>
        <div className="flex gap-4">
          <span>Terms</span>
          <span>Privacy</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
