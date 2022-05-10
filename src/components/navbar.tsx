import { Flex } from "@chakra-ui/react";
import NavLink from "./navlink";
import { FiPackage } from "react-icons/fi";
import { BiGitBranch } from "react-icons/bi";
import { AiFillPhone } from "react-icons/ai";

const Navbar = (): JSX.Element => {
  return (
    <Flex direction="row">
      <NavLink icon={FiPackage} text="projects" link="/projects/" />
      <NavLink icon={BiGitBranch} text="git" link="https://github.com/omfj/" />
      <NavLink icon={AiFillPhone} text="contact" link="/contact/" />
    </Flex>
  );
};

export default Navbar;
