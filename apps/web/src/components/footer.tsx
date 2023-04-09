import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t py-5 text-center">
      <p className="text-sm text-gray-500">
        © {new Date().getFullYear()}{" "}
        <Link className="hover:underline" href="https://github.com/omfj/omfj.no">
          Made with ❤️ by omfj
        </Link>
      </p>
    </footer>
  );
}
