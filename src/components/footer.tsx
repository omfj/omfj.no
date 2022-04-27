import { Center, Text } from "@chakra-ui/react";

const Footer = (): JSX.Element => {
  return (
    <Center
      pos="absolute"
      bottom="0"
      w="100%"
      py="5"
      borderTop="2px solid white"
      bg="#0c1018"
    >
      <Text>Made with ❤️ by Ole Magnus</Text>
    </Center>
  );
};

export default Footer;
