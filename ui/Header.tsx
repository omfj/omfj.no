'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { MdClose, MdMenu } from 'react-icons/md';

const routes = [
  { path: '/', name: 'Home' },
  { path: '/projects', name: 'Projects' },
  { path: '/contact', name: 'Contact' },
];

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMenuOpen]);

  return (
    <>
      {!isMenuOpen && (
        <header
          id="desktop-header"
          className="mb-10 flex flex-row items-center py-4 px-5 md:px-10"
        >
          <h1 className="text-4xl md:text-5xl">omfj.no</h1>
          <div className="flex flex-grow" />

          {/* Desktop menu */}
          <nav className="hidden flex-row gap-4 lg:flex">
            {routes.map((route) => (
              <Link
                className="text-faded transition-colors duration-200 hover:text-secondary"
                key={route.path}
                href={route.path}
              >
                {route.name}
              </Link>
            ))}
          </nav>

          {/* Mobile menu button */}
          <button onClick={() => setIsMenuOpen((prev) => !prev)}>
            <MdMenu className="h-8 w-8 lg:hidden" />
          </button>
        </header>
      )}

      {/* Mobile menu */}
      {isMenuOpen && (
        <nav
          id="menu-modal"
          className="w-scren z-50 mb-5 flex h-screen flex-col gap-4 py-4 px-5 md:px-10 lg:hidden"
        >
          <div className="flex flex-row items-center">
            <h1 className="text-4xl md:text-5xl">omfj.no</h1>
            <div className="flex flex-grow" />
            <button onClick={() => setIsMenuOpen((prev) => !prev)}>
              <MdClose className="h-8 w-8 lg:hidden" />
            </button>
          </div>
          <hr />
          <ul className="flex flex-col gap-5">
            {routes.map((route) => (
              <li
                key={route.path}
                className="ml-auto mr-0 text-5xl transition-all duration-150 hover:mr-2"
              >
                <Link
                  className="transition-colors duration-200 hover:text-secondary"
                  href={route.path}
                  onClick={() => setIsMenuOpen((prev) => !prev)}
                >
                  {route.name}
                </Link>
              </li>
            ))}
          </ul>
          <div className="flex flex-grow" />
          <p className="text-center">Made with 🍺</p>
        </nav>
      )}
    </>
  );
};

export default Header;
