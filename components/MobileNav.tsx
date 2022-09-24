import {
  Drawer,
  DrawerCloseButton,
  DrawerContent,
  DrawerOverlay,
  Flex,
  IconButton,
  useColorModeValue,
  useDisclosure,
  Link,
  DrawerHeader,
  Spacer,
  DrawerBody,
} from "@chakra-ui/react";
import NextLink from "next/link";
import { useRef } from "react";
import { AiOutlineMenu } from "react-icons/ai";
import { Route } from "./Header";
import { IoMdClose } from "react-icons/io";

interface Props {
  routes: Array<Route>;
}

const MobileNav = ({ routes }: Props) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const bgDrawer = useColorModeValue("bg.light", "bg.dark");
  const bgHover = useColorModeValue("hover.light", "hover.dark");

  const btnRef = useRef();

  return (
    <>
      <IconButton
        display={["block", "block", "none"]}
        variant="ghost"
        p="1.5"
        aria-label="Open sidebar menu"
        onClick={onOpen}
        as={AiOutlineMenu}
        cursor="pointer"
      />

      <Drawer isOpen={isOpen} placement="right" onClose={onClose}>
        <DrawerOverlay backdropFilter="auto" backdropBlur="sm" />
        <DrawerContent bg={bgDrawer}>
          <DrawerHeader>
            <Flex direction="row" alignItems="center">
              <Spacer />
              <IconButton
                as={IoMdClose}
                onClick={onClose}
                variant="ghost"
                aria-label="Close menu"
                cursor="pointer"
                size="sm"
              />
            </Flex>
          </DrawerHeader>
          <DrawerBody p="0">
            <Flex direction="column" gap="1">
              {routes.map((route) => (
                <NextLink href={route.path} passHref key={route.title}>
                  <Link p="2" px="5" _hover={{ bg: bgHover }} fontSize="3xl">
                    {route.title}
                  </Link>
                </NextLink>
              ))}
            </Flex>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default MobileNav;
