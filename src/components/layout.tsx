// import Footer from "./footer";
import Header from "./header/header";

interface Props {
  children: React.ReactNode;
}

const Layout = ({ children }: Props): JSX.Element => {
  return (
    <div className="min-h-screen min-w-screen overflow-hidden bg-slate-50 dark:bg-[#151515]">
      <Header />
      {children}
      {/* <Footer /> */}
    </div>
  );
};

export default Layout;
