import { Icon, Text, Center, Flex, Box } from "@chakra-ui/react";
import NextLink from "next/link";
import { useRouter } from "next/router";

interface Props {
  text: string;
  link: string;
  icon: any;
}

const NavLink = ({ text, link, icon }: Props): JSX.Element => {
  const router = useRouter();
  const active: boolean = router.asPath === link;

  return (
    <Center mt={["2", "0"]}>
      <NextLink href={link} passHref>
        <a>
          <Box
            display="flex"
            bg="transparent"
            borderBottom="2px solid transparent"
            p="3"
            borderColor={active ? "white" : "transparent"}
            _hover={{ cursor: "pointer" }}
          >
            <Flex
              className="child"
              alignItems="center"
              w="fit-content"
              borderRadius="0.25rem"
              p="1.5"
              _hover={{ bg: "#333" }}
            >
              <Icon as={icon} mr={["0", "1.5"]} fontSize={["xl", "sm"]} />
              <Text fontSize="md" display={["none", "block"]}>
                {text}
              </Text>
            </Flex>
          </Box>
        </a>
      </NextLink>
    </Center>
  );
};

export default NavLink;
