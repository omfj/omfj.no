import { Flex, Icon, LinkBox, useColorModeValue } from "@chakra-ui/react";
import NextLink from "next/link";

interface Props {
  name: string;
  to: string;
  username: string;
  icon?: any;
}

const ContactBox = ({ name, to, username, icon }: Props) => {
  const bgHover = useColorModeValue("hover.light", "hover.dark");

  return (
    <NextLink href={to} passHref>
      <LinkBox
        borderRadius="base"
        border="1px"
        borderColor="#666"
        p="2"
        transition="0.2s ease-in-out"
        _hover={{ cursor: "pointer", bg: bgHover }}
      >
        <Flex alignItems="center" w="fit-content" mx="auto" gap="2">
          {icon && <Icon as={icon} w="7" h="7" />}
          {name} as {username}
        </Flex>
      </LinkBox>
    </NextLink>
  );
};

export default ContactBox;
