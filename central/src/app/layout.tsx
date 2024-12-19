import type { Metadata } from 'next';
import localFont from 'next/font/local';
import './globals.css';
import StockTicker from '../components/StockTicker';
import Weather from '../components/Weather';
import UnsplashWallpaper from '../components/UnsplashWallpaper';
import Calendar from '../components/Calendar';
import CurrentTime from '../components/CurrentTime';
import NewsHeadlines from '../components/NewsHeadlines';
import CurrentClass from '../components/CurrentClass';

const geistSans = localFont({
  src: './fonts/GeistVF.woff',
  variable: '--font-geist-sans',
  weight: '100 900',
});
const geistMono = localFont({
  src: './fonts/GeistMonoVF.woff',
  variable: '--font-geist-mono',
  weight: '100 900',
});

export const metadata: Metadata = {
  title: 'Central Dashboard',
  description: 'A dashboard with stock ticker, weather, and calendar widgets',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <UnsplashWallpaper />
        <div className="container mx-auto p-4 relative z-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="widget"><StockTicker /></div>
          <div className="widget"><Weather /></div>
          <div className="widget"><Calendar /></div>
          <div className="widget"><CurrentTime /></div>
          <div className="widget"><NewsHeadlines /></div>
          <div className="widget"><CurrentClass /></div>
          {children}
        </div>
      </body>
    </html>
  );
}