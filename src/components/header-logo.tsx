import NextLink from "next/link";
import { Text } from "@chakra-ui/react";

const HeaderLogo = () => (
  <NextLink href="/" passHref>
    <a>
      <Text
        fontWeight="extrabold"
        fontSize={["2.25rem", "2rem"]}
        _hover={{ cursor: "pointer" }}
      >
        omfj.no
      </Text>
    </a>
  </NextLink>
);

export default HeaderLogo;
