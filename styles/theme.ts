import { extendTheme } from "@chakra-ui/react";
import type { StyleFunctionProps } from "@chakra-ui/styled-system";
import { mode } from "@chakra-ui/theme-tools";

const theme = extendTheme({
  useSystemColorMode: true,
  initialColorMode: "system",
  colors: {
    bg: {
      light: "#eee",
      dark: "#222",
    },
    hover: {
      light: "#ddd",
      dark: "#333",
    },
  },
  styles: {
    global: (props: StyleFunctionProps) => ({
      body: {
        color: mode("black", "white")(props),
        bg: mode("bg.light", "bg.dark")(props),
      },
    }),
  },
  components: {
    Text: {
      variants: {
        subtle: (props: StyleFunctionProps) => ({
          color: mode("#333", "#aaa")(props),
        }),
        highlight: (props: StyleFunctionProps) => ({
          color: mode("blue.700", "blue.500")(props),
        }),
      },
    },
  },
});

export default theme;
