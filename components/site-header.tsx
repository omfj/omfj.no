"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";

const routes = [
  {
    label: "Projects",
    to: "/projects",
  },
  {
    label: "Studio",
    to: "/studio",
  },
];

export const Header = () => {
  const pathname = usePathname();

  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen((prev) => !prev);

  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  return (
    <>
      <div className="top-0 z-30 w-full">
        <header className="flex items-center p-4">
          <div>
            <Link href="/">
              <h1 className="text-5xl font-light">omfj</h1>
            </Link>
          </div>

          <div className="ml-auto flex items-center gap-2">
            <nav className="hidden md:block">
              <ul className="flex">
                {routes.map(({ label, to }) => {
                  return (
                    <li key={`${label}${to}`}>
                      <Link
                        className="rounded border-transparent px-2 py-1 text-xl transition-colors hover:text-blue-400"
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
              <button className="h-10 w-10 md:hidden" onClick={toggle}>
                {isOpen ? <XMarkIcon /> : <Bars3Icon />}
              </button>
            </div>
          </div>
        </header>
      </div>

      {isOpen && (
        // MobileNav
        <div className="absolute z-50 h-screen w-full bg-background">
          {/* MobileNav Header */}
          <div className="flex items-center justify-between border-b p-4">
            <div>
              <h2 className="text-4xl font-light">Menu</h2>
            </div>
            <button className="h-10 w-10 md:hidden" onClick={toggle}>
              {isOpen ? <XMarkIcon /> : <Bars3Icon />}
            </button>
          </div>

          {/* MobileNav Content */}
          <div className="flex flex-col gap-3 p-5">
            <ul className="flex flex-col text-5xl">
              {routes.map(({ label, to }) => (
                <li key={`${label}${to}`} className="py-3">
                  <Link
                    className="flex transition-colors hover:text-blue-500"
                    href={to}
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </>
  );
};
