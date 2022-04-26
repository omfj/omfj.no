import { Box, Text } from "@chakra-ui/react";
import { NextPageContext } from "next";
import Main from "../components/main";
import SEO from "../components/SEO";

interface ErrorComponentProps {
  statusCode?: number;
}

const Error = ({ statusCode }: ErrorComponentProps): JSX.Element => {
  return (
    <Main>
      <SEO title="Error" />
      <Box>
        <Text textAlign="center" fontWeight="extrabold" fontSize="2rem">
          {statusCode
            ? "An error occurred on server"
            : "An error occurred on client"}
        </Text>
        <Text textAlign="center" fontSize="2rem">
          {statusCode}
        </Text>
      </Box>
    </Main>
  );
};

Error.getInitialProps = ({ res, err }: NextPageContext) => {
  const statusCode = res ? res.statusCode : err ? err.statusCode : 404;
  return { statusCode };
};

export default Error;
