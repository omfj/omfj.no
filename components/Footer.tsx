import { Center, Link, Text } from "@chakra-ui/react";

const Footer = () => {
  return (
    <Center as="footer" p="5" mt="3">
      <Link
        href="https://github.com/omfj/omfj.no"
        _hover={{ textDecor: "underline" }}
      >
        <Text fontSize="sm">Made with 🍺 and ❤️</Text>
      </Link>
    </Center>
  );
};

export default Footer;
