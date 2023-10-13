export const Footer = () => {
  return (
    <footer className="py-8 text-center md:py-6">
      <p className="text-sm text-gray-500">
        © {new Date().getFullYear()}{" "}
        <a
          className="font-semibold hover:underline"
          href="https://github.com/omfj/omfj.no"
        >
          Made with 🍺 by omfj
        </a>
      </p>
    </footer>
  );
};
