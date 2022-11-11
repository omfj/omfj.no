import Footer from '@/ui/Footer';
import Header from '@/ui/Header';
import ProgressBar from '@/ui/ProgressBar';
import '@/styles/globals.css';

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html lang="en">
      <head>
        <title>omfj.no</title>
        <meta name="description" content="My personal website" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta
          name="keywords"
          content="omfj, ole magnus, ole magnus fon johnsen, olem"
        />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="msapplication-TileColor" content="#ffffff" />
        <meta name="theme-color" content="#0a0a0a" />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon-16x16.png"
        />
        <link rel="manifest" href="/manifest.json" />
        <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#5bbad5" />
      </head>
      <body className="min-w-screen flex min-h-screen flex-col">
        <ProgressBar />
        <Header />
        {children}
        <div className="flex-grow" />
        <Footer />
      </body>
    </html>
  );
};

export default RootLayout;
