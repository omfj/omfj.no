import { IconButton, useColorMode, useColorModeValue } from "@chakra-ui/react";
import Head from "next/head";
import { BsMoonStarsFill, BsSun } from "react-icons/bs";

const ColorModeButton = () => {
  const { toggleColorMode } = useColorMode();

  const icon = useColorModeValue(BsMoonStarsFill, BsSun);
  const themeColor = useColorModeValue("bg.light", "bg.dark");

  return (
    <>
      <Head>
        <meta name="theme-color" content={themeColor} />
      </Head>
      <IconButton
        variant="ghost"
        p="1.5"
        aria-label="Toggle color mode"
        onClick={toggleColorMode}
        as={icon}
        cursor="pointer"
      />
    </>
  );
};

export default ColorModeButton;
