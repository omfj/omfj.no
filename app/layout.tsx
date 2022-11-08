import Footer from '@/ui/Footer';
import Header from '@/ui/Header';
import SEO from '@/ui/SEO';
import '@/styles/globals.css';

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html lang="en">
      <head>
        <SEO title="omfj" description="My personal website." />

        <link rel="icon" href="/favicon.ico" />
      </head>
      <body className="min-w-screen flex min-h-screen flex-col">
        <Header />
        {children}
        <div className="flex-grow" />
        <Footer />
      </body>
    </html>
  );
};

export default RootLayout;
