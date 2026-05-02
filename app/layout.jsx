import "./globals.css";
import "../src/styles/tokens.css";
import { Funnel_Display } from "next/font/google";
import { ThemeProvider } from "../src/components/ThemeProvider";
import StarCursor from "../src/components/StarCursor";
import ScrollProgress from "../src/components/ScrollProgress";

const funnelDisplay = Funnel_Display({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  variable: "--font-funnel-display",
});

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || "https://ventureuniverse.vercel.app";

export const metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Venture Universe — your gateway to the cosmos",
    template: "%s · Venture Universe",
  },
  description:
    "Live ISS tracking, NASA APOD, mission explorer, sky tonight, and the latest space news — all in one immersive cosmos.",
  keywords: [
    "space",
    "NASA",
    "ISRO",
    "ISS tracker",
    "astronomy",
    "space news",
    "missions",
    "APOD",
    "sky tonight",
  ],
  authors: [{ name: "Venture Universe" }],
  openGraph: {
    type: "website",
    siteName: "Venture Universe",
    title: "Venture Universe — your gateway to the cosmos",
    description:
      "Live ISS tracking, sky-tonight, mission explorer, and the latest space news.",
    url: SITE_URL,
  },
  twitter: {
    card: "summary_large_image",
    title: "Venture Universe",
    description: "Live ISS tracking, sky-tonight, missions, and space news.",
  },
  alternates: {
    canonical: SITE_URL,
    types: { "application/rss+xml": [{ url: "/feed.xml", title: "Venture Universe" }] },
  },
};

export const viewport = {
  themeColor: "#030412",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" data-theme="dark" suppressHydrationWarning>
      <body
        className={funnelDisplay.variable}
        style={{ fontFamily: 'var(--font-funnel-display), "Funnel Display", sans-serif' }}
      >
        <a href="#main-content" className="vu-skip-link">
          Skip to content
        </a>
        <ThemeProvider>
          <StarCursor />
          <ScrollProgress />
          <div id="main-content">{children}</div>
        </ThemeProvider>
      </body>
    </html>
  );
}
