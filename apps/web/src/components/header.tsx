import {useState} from "react";
import Link from "next/link";
import {Bars3Icon, XMarkIcon} from "@heroicons/react/24/outline";
import clsx from "clsx";

import Button from "./ui/button";

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
    <div className="sticky top-0 z-30 w-full">
      <header
        className={clsx("flex items-baseline border-b p-5 backdrop-blur", {
          "bg-white backdrop-blur-0": isOpen,
        })}
      >
        <div>
          <Link href="/">
            <h1 className="text-3xl font-bold">omfj</h1>
          </Link>
        </div>

        <div className="ml-auto mt-auto flex items-center gap-2">
          <nav className="hidden md:block">
            <ul className="flex gap-1">
              {routes.map(({label, to}) => {
                return (
                  <li key={`${label}${to}`}>
                    <Link
                      className="rounded border-2 border-transparent px-2 py-1 text-sm font-semibold transition-colors hover:text-blue-400"
                      href={to}
                    >
                      {label}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>
          <div className="flex items-center gap-4">
            <button className="h-6 w-6 md:hidden" onClick={toggle}>
              {isOpen ? <XMarkIcon /> : <Bars3Icon />}
            </button>
          </div>
        </div>
      </header>
      {isOpen && (
        <div className="absolute z-10 mx-auto w-full bg-inherit px-2 py-3 sm:px-3">
          <div className="flex flex-col gap-3 rounded-lg border bg-white p-5 shadow-xl">
            <ul className="flex flex-col divide-y text-xl">
              {routes.map(({label, to}) => {
                return (
                  <li key={`${label}${to}`} className="py-3">
                    <Link className="flex hover:text-blue-500" href={to}>
                      {label}
                    </Link>
                  </li>
                );
              })}
            </ul>
            <Button onClick={toggle}>Close</Button>
          </div>
        </div>
      )}
    </div>
  );
}
