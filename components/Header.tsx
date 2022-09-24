import { Box, Flex, Heading, Spacer } from "@chakra-ui/react";
import ColorModeButton from "./ColorModeButton";
import DesktopNav from "./DesktopNav";
import MobileNav from "./MobileNav";
import NavLink from "./NavLink";

export interface Route {
  title: string;
  path: string;
}

const routes = [
  {
    path: "/",
    title: "Home",
  },
  {
    path: "/projects",
    title: "Projects",
  },
  {
    path: "/contact",
    title: "Contact",
  },
];

const Header = () => {
  return (
    <Flex
      as="header"
      px={[3, 5, 10]}
      py="5"
      mb="10"
      transition="0.2s ease-in-out"
      dir="row"
      alignItems="center"
    >
      <Heading className="font-bold">omfj.no</Heading>
      <Spacer />
      <DesktopNav {...{ routes }} />
      <MobileNav {...{ routes }} />
      <ColorModeButton />
    </Flex>
  );
};

export default Header;
