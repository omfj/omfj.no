import {
  Flex,
  Text,
  Box,
  Drawer,
  DrawerContent,
  DrawerBody,
  DrawerCloseButton,
  DrawerOverlay,
  useDisclosure,
  Link,
  DrawerFooter,
} from "@chakra-ui/react";
import NavLink from "./navlink";
import NextLink from "next/link";
import { FiPackage } from "react-icons/fi";
import { BiGitBranch } from "react-icons/bi";
import { AiFillPhone } from "react-icons/ai";
import { GiHamburgerMenu } from "react-icons/gi";
import { useRouter } from "next/router";

const Navbar = (): JSX.Element => (
  <Flex direction="row" py={["5", null, "0"]}>
    <Flex display={["none", null, "flex"]}>
      <NavLink icon={FiPackage} text="projects" link="/projects/" />
      <NavLink icon={BiGitBranch} text="git" link="https://github.com/omfj/" />
      <NavLink icon={AiFillPhone} text="contact" link="/contact/" />
    </Flex>
    <Flex display={["flex", null, "none"]}>
      <NavDrawer />
    </Flex>
  </Flex>
);

const NavDrawer = (): JSX.Element => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Box _hover={{ cursor: "pointer" }}>
        <GiHamburgerMenu color="white" size={30} onClick={onOpen} />
      </Box>
      <Drawer isOpen={isOpen} onClose={onClose} size="xs">
        <DrawerOverlay />
        <DrawerContent bg="black" borderLeft="2px solid white">
          <DrawerCloseButton />
          <DrawerBody py="14" onClick={onClose}>
            <NavDrawerLink title="projects" link="/projects/" />
            <NavDrawerLink title="git" link="https://github.com/omfj/" />
            <NavDrawerLink title="contact" link="/contact/" />
          </DrawerBody>
          <DrawerFooter>
            <Text textAlign="left" mr="auto">
              Feedback is always appreciated
            </Text>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  );
};

interface NavDrawerLinkProps {
  title: string;
  link: string;
}

const NavDrawerLink = ({ title, link }: NavDrawerLinkProps): JSX.Element => {
  const router = useRouter();
  const active: boolean = router.asPath === link;

  return (
    <Box textAlign="right">
      <NextLink href={link} passHref>
        <a>
          <Link
            color="white"
            fontSize="4xl"
            textDecor={active ? "underline" : "none"}
          >
            {title}
          </Link>
        </a>
      </NextLink>
    </Box>
  );
};

export default Navbar;
