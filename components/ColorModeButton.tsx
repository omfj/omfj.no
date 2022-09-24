import { IconButton, useColorMode, useColorModeValue } from "@chakra-ui/react";
import Head from "next/head";
import { BsMoonStarsFill, BsSun } from "react-icons/bs";
import { mode } from "@chakra-ui/theme-tools";

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
        p="2"
        aria-label="Toggle color mode"
        onClick={toggleColorMode}
        as={icon}
      />
    </>
  );
};

export default ColorModeButton;
