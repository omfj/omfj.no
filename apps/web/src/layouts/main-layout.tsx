import Footer from "@/components/footer";
import Header from "@/components/header";

type MainLayoutProps = {
  children: React.ReactNode;
};

export default function MainLayout({children}: MainLayoutProps) {
  return (
    <div className="flex min-h-screen flex-col bg-white">
      <Header />
      <main className="mx-auto w-full max-w-3xl flex-1 px-5 py-10">{children}</main>
      <Footer />
    </div>
  );
}
