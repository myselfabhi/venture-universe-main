import "./globals.css";
import { Funnel_Display } from "next/font/google";

const funnelDisplay = Funnel_Display({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  variable: "--font-funnel-display",
});

export const metadata = {
  title: "Venture Universe",
  description: "Your gateway to the cosmos - space news, discoveries, and ISRO milestones",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={funnelDisplay.variable} style={{ fontFamily: 'var(--font-funnel-display), "Funnel Display", sans-serif' }}>
        {children}
      </body>
    </html>
  );
}
