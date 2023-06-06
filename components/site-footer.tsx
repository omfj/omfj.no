const Footer = () => {
  return (
    <footer className="border-t py-8 text-center md:py-6">
      <p className="text-sm text-gray-500">
        © {new Date().getFullYear()}{" "}
        <a className="font-semibold hover:underline" href="https://github.com/omfj/omfj.no">
          Made with 🍺 by omfj
        </a>
      </p>
    </footer>
  );
};

export default Footer;
