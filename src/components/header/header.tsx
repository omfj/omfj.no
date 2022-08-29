import HeaderLogo from "./header-logo";
import { AiFillGithub, AiOutlineClose, AiOutlineMenu } from "react-icons/ai";
import { NavLinkMobile, IconLink, NavLinkDesktop } from "./navlinks";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import ColorModeBtn from "./color-mode-btn";

const Header = () => {
  const [open, isOpen] = useState(false);

  const variants = {
    open: { opacity: 1, x: 0 },
    closed: { opacity: 0, x: "-100%" },
  };

  useEffect(() => {
    document.body.classList.toggle("overflow-hidden", open);
  }, [open]);

  return (
    <div>
      <nav className="px-4 m-auto max-w-7xl md:px-10 md:flex md:justify-between transition-transform">
        <div className="flex justify-between items-center p-4">
          <HeaderLogo />
          <div>
            {!open && (
              <AiOutlineMenu
                className="md:hidden pt-2 hover:cursor-pointer"
                size={45}
                onClick={() => isOpen(!open)}
              />
            )}
          </div>
        </div>
        <div className="hidden md:flex items-center gap-5">
          <NavLinkDesktop text="projects" to="/projects/" />
          <NavLinkDesktop text="contact" to="/contact/" />
          <ColorModeBtn />
          <IconLink
            icon={<AiFillGithub size={30} />}
            to="https://github.com/omfj/"
          />
        </div>

        {/* Navigation drawer modal */}

        <motion.div
          exit={{ opacity: 0 }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className={
            open
              ? `md:hidden fixed z-50 top-0 right-0 bottom-0 m-0 left-0 h-screen w-full py-4 px-5 bg-slate-50 dark:bg-[#151515]`
              : "hidden"
          }
        >
          <div className="flex justify-between border-b pb-3 border-neutral-500 dark:border-neutral-400">
            <ColorModeBtn isMobile />
            <IconLink
              icon={<AiFillGithub size={40} />}
              to="https://github.com/omfj"
              isMobile
            />
            <div className="p-2 hover:cursor-pointer w-fit">
              <AiOutlineClose size={40} onClick={() => isOpen(!open)} />
            </div>
          </div>

          <motion.div
            className="mt-5 items-end flex flex-col"
            animate={open ? "open" : "closed"}
            variants={variants}
          >
            <NavLinkMobile isOpen={isOpen} open={open} text="home" to="/" />
            <NavLinkMobile
              isOpen={isOpen}
              open={open}
              text="projects"
              to="/projects/"
            />
            <NavLinkMobile
              isOpen={isOpen}
              open={open}
              text="contact"
              to="/contact/"
            />
          </motion.div>
        </motion.div>
      </nav>
    </div>
  );
};

export default Header;
