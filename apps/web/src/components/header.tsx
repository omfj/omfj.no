import {useState} from "react";
import Link from "next/link";

const routes = [
  {
    label: "Home",
    to: "/",
  },
  {
    label: "Projects",
    to: "/projects",
  },
];

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen((prev) => !prev);

  return (
    <div className="sticky top-0 z-30 w-full bg-white">
      <header className="flex items-baseline border-b p-5">
        <div>
          <Link href="/">
            <h1 className="text-3xl font-bold">omfj</h1>
          </Link>
        </div>

        <div className="ml-auto mt-auto">
          <nav className="hidden md:block">
            <ul className="flex gap-2">
              {routes.map(({label, to}) => {
                return (
                  <li key={`${label}${to}`}>
                    <Link
                      className="rounded border-2 border-transparent px-2 py-1 transition-colors hover:text-blue-400"
                      href={to}
                    >
                      {label}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>
          <div className="flex md:hidden">
            {isOpen ? (
              <button onClick={toggle}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="h-6 w-6"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            ) : (
              <button onClick={toggle}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="h-6 w-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                  />
                </svg>
              </button>
            )}
          </div>
        </div>
      </header>
      {isOpen && (
        <div className="absolute z-10 mx-auto w-full bg-inherit px-2 py-3 sm:px-3">
          <div className="rounded-lg border p-5">
            <ul className="flex flex-col divide-y text-xl">
              {routes.map(({label, to}) => {
                return (
                  <li key={`${label}${to}`} className="py-2">
                    <Link className="flex hover:text-blue-500" href={to}>
                      {label}
                    </Link>
                  </li>
                );
              })}
            </ul>
            <button onClick={toggle} className="mt-2 w-full rounded border py-2">
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
