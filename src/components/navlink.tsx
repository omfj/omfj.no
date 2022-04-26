import { Box, Flex, Icon, Link } from "@chakra-ui/react";
import NextLink from "next/link";
import { useRouter } from "next/router";
import { BiHome } from "react-icons/bi";

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
    <Box
      borderRadius="0.5rem"
      alignItems="center"
      bg="transparent"
      _hover={{ backgroundColor: "gray" }}
      textDecor={active ? "underline" : "none"}
    >
      <Icon as={icon} mr="2" />
      <Link>{text}</Link>
    </Box>
  );
};

const NavLink = ({ text, link, icon }: Props): JSX.Element => {
  const router = useRouter();
  const active: boolean = router.asPath === link;

  return (
    <Flex alignItems="center" m="2" p="2">
      <NextLink href={link} passHref>
        <NavButton link={link} text={text} icon={icon} />
      </NextLink>
    </Flex>
  );
};

export default NavLink;
