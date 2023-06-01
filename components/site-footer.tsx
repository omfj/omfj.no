const Footer = () => {
  return (
    <footer className="border-t py-5 text-center">
      <p className="text-sm text-gray-500">
        © {new Date().getFullYear()}{" "}
        <a className="font-medium hover:underline" href="https://github.com/omfj/omfj.no">
          Made with 🍺 by omfj
        </a>
      </p>
    </footer>
  );
};

export default Footer;
