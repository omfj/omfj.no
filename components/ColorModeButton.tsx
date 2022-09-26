import { IconButton, useColorMode, useColorModeValue } from "@chakra-ui/react";
import Head from "next/head";
import { useState } from "react";
import { BsMoonStarsFill, BsSun } from "react-icons/bs";

const ColorModeButton = () => {
  const { colorMode, toggleColorMode } = useColorMode();

  const icon = useColorModeValue(BsMoonStarsFill, BsSun);

  return (
    <>
      <Head>
        <meta
          name="theme-color"
          content={colorMode == "light" ? "#fdf6e3" : "#222"}
        />
      </Head>

      <IconButton
        variant="ghost"
        p="2.5"
        aria-label="Toggle color mode"
        onClick={toggleColorMode}
        as={icon}
        cursor="pointer"
      />
    </>
  );
};

export default ColorModeButton;
