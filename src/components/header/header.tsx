import HeaderLogo from "./header-logo";
import { AiFillPhone, AiOutlineClose, AiOutlineMenu } from "react-icons/ai";
import { NavLinkDesktop, NavLinkMobile } from "./navlinks";
import { BiGitBranch } from "react-icons/bi";
import { FiPackage } from "react-icons/fi";
import { useState } from "react";
import { motion } from "framer-motion";

const Header = (): JSX.Element => {
  const [open, isOpen] = useState(true);

  const variants = {
    open: { opacity: 1, x: 0 },
    closed: { opacity: 0, x: "-100%", display: "none" },
  };

  return (
    <div>
      <nav className="md:px-10 md:flex md:justify-between">
        <div className="flex justify-between items-center p-4">
          <HeaderLogo />
          <div className="md:hidden pt-2">
            {open && (
              <AiOutlineMenu
                className="hover:cursor-pointer"
                size={30}
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
            icon={<BiGitBranch />}
            text="git"
            to="https://github.com/omfj/"
          />
          <NavLinkDesktop
            icon={<AiFillPhone />}
            text="contact"
            to="/contact/"
          />
        </div>
        <div
          className={
            !open
              ? `fixed z-50 overflow-hidden top-0 right-0 bottom-0 left-0 h-full w-full object-fill p-10 bg-[#070707] md:hidden`
              : "hidden"
          }
        >
          <AiOutlineClose
            className="hover:cursor-pointer"
            size={40}
            onClick={() => isOpen(!open)}
          />
          <motion.div animate={!open ? "open" : "closed"} variants={variants}>
            <div className="mt-5" onClick={() => isOpen(!open)}>
              <NavLinkMobile text="home" to="/" />
              <NavLinkMobile text="projects" to="/projects/" />
              <NavLinkMobile text="git" to="https://github.com/omfj/" />
              <NavLinkMobile icon={AiFillPhone} text="contact" to="/contact/" />
            </div>
          </motion.div>
        </div>
      </nav>
    </div>
  );
};

export default Header;
