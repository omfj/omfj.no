import HeaderLogo from "./header-logo";
import {
  AiFillGithub,
  AiFillPhone,
  AiOutlineClose,
  AiOutlineMenu,
} from "react-icons/ai";
import { NavLinkDesktop, NavLinkMobile } from "./navlinks";
import { FiPackage } from "react-icons/fi";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import ColorModeBtn from "../color-mode-btn";

const Header = () => {
  const [open, isOpen] = useState(false);

  const variants = {
    open: { opacity: 1, x: 0 },
    closed: { opacity: 0, x: "-100%", display: "none" },
  };

  useEffect(() => {
    open
      ? (document.body.style.position = "fixed")
      : (document.body.style.position = "static");
  }, [open]);

  return (
    <div className="m-auto max-w-7xl">
      <nav className="px-4 md:px-10 md:flex md:justify-between transition-transform">
        <div className="flex justify-between items-center p-4">
          <HeaderLogo />
          <div className="md:hidden pt-2">
            {!open && (
              <AiOutlineMenu
                className="hover:cursor-pointer"
                size={40}
                onClick={() => isOpen(!open)}
              />
            )}
          </div>
        </div>
        <div className="hidden md:flex items-center gap-5">
          <NavLinkDesktop
            icon={<FiPackage />}
            text="projects"
            to="/projects/"
          />
          <NavLinkDesktop
            icon={<AiFillPhone />}
            text="contact"
            to="/contact/"
          />
          <ColorModeBtn />
          <NavLinkDesktop
            icon={<AiFillGithub size={30} />}
            to="https://github.com/omfj/"
          />
        </div>
        <div
          className={
            open
              ? `fixed block z-50 top-0 right-0 bottom-0 left-0 h-full w-full p-14 bg-slate-50 dark:bg-[#070707] md:hidden`
              : "hidden"
          }
        >
          <motion.div animate={open ? "open" : "closed"} variants={variants}>
            <div className="flex justify-between border-b border-neutral-500 dark:border-neutral-400">
              <div className="p-2 hover:cursor-pointer w-fit">
                <AiOutlineClose size={40} onClick={() => isOpen(!open)} />
              </div>
              <ColorModeBtn isMobile />
            </div>

            <div className="mt-5" onClick={() => isOpen(!open)}>
              <NavLinkMobile text="home" to="/" />
              <NavLinkMobile text="projects" to="/projects/" />
              <NavLinkMobile text="contact" to="/contact/" />
              <NavLinkMobile text="github" to="https://github.com/omfj/" />
            </div>
          </motion.div>
        </div>
      </nav>
    </div>
  );
};

export default Header;
