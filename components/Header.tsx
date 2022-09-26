import { Center, Flex, Heading, Spacer } from "@chakra-ui/react";
import ColorModeButton from "./ColorModeButton";
import DesktopNav from "./DesktopNav";
import MobileNav from "./MobileNav";

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
    <Center mb="10">
      <Flex
        as="header"
        px={[5, 10]}
        py="5"
        transition="0.2s ease-in-out"
        dir="row"
        alignItems="center"
        w="100%"
        maxW="1300"
      >
        <Heading className="font-bold">omfj.no</Heading>
        <Spacer />
        <DesktopNav {...{ routes }} />
        <MobileNav {...{ routes }} />
        <ColorModeButton />
      </Flex>
    </Center>
  );
};

export default Header;
