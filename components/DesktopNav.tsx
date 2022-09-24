import { Box, Flex } from "@chakra-ui/react";
import type { Route } from "./Header";
import NavLink from "./NavLink";

interface Props {
  routes: Array<Route>;
}

const DesktopNav = ({ routes }: Props) => (
  <Box display={["none", null, "block"]} mr="5">
    <Flex as="nav" gap="5">
      {routes.map((route) => (
        <NavLink key={route.path} title={route.title} to={route.path} />
      ))}
    </Flex>
  </Box>
);

export default DesktopNav;
