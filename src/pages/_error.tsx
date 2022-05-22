import { NextPageContext } from "next";
import Main from "../components/main";
import SEO from "../components/SEO";

interface ErrorComponentProps {
  statusCode?: number;
}

const Error = ({ statusCode }: ErrorComponentProps): JSX.Element => {
  return (
    <Main>
      <SEO title={statusCode + " Error"} />
      <div>
        <p className="text-center font-extrabold text-2xl">
          {statusCode
            ? "An error occurred on server"
            : "An error occurred on client"}
        </p>
        <p className="text-center text-xl">{statusCode}</p>
      </div>
    </Main>
  );
};

Error.getInitialProps = ({ res, err }: NextPageContext) => {
  const statusCode = res ? res.statusCode : err ? err.statusCode : 404;
  return { statusCode };
};

export default Error;
