// import Footer from "./footer";
import Header from "./header/header";

interface Props {
  children: React.ReactNode;
}

const Layout = ({ children }: Props): JSX.Element => {
  return (
    <div className="min-h-screen min-w-screen overflow-hidden">
      <Header />
      {children}
      {/* <Footer /> */}
    </div>
  );
};

export default Layout;
