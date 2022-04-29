import { Flex, Box, Icon, Text, Link, Center } from "@chakra-ui/react";
import NextLink from "next/link";
import { useRouter } from "next/router";

interface Props {
  text: string;
  link: string;
  icon: any;
}

interface ButtonProps {
  text: string;
  link: string;
  icon: any;
}

const NavButton = ({ text, icon, link }: ButtonProps): JSX.Element => {
  const router = useRouter();
  const active: boolean = router.asPath === link;

  return (
    <Link
      display="flex"
      alignItems="center"
      bg="transparent"
      p="2"
      textDecor={active ? "underline" : "none"}
      _hover={{ textDecor: "underline" }}
      href={link}
    >
      <Icon as={icon} mr="1.5" fontSize={["2xl", "sm"]} />
      <Text fontSize="md" display={["none", "block"]}>
        {text}
      </Text>
    </Link>
  );
};

const NavLink = ({ text, link, icon }: Props): JSX.Element => {
  return (
    <Center mx="3" mt={["2", "0"]}>
      <NextLink href={link} passHref>
        <NavButton link={link} text={text} icon={icon} />
      </NextLink>
    </Center>
  );
};

export default NavLink;
