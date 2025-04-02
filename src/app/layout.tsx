// src/app/layout.tsx
import Header from '../components/Header';
import Footer from '../components/Footer';
import './globals.css';

export const metadata = {
  title: 'Venture Universe - Space News & Articles',
  description: 'Explore the latest space news and articles from Venture Universe.',
  icons: {
    icon: '/venture_universe_logo.jpg',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="flex flex-col min-h-screen bg-vu-space text-vu-cyan">
        <Header />
        <main className="flex-grow">{children}</main>
        <Footer />
      </body>
    </html>
  );
}