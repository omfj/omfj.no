import NextLink from "next/link";
import Image from "next/image";
import * as Emoji from "../../public/images/thinkingemoji.png";
import Main from "../components/main";
import SEO from "../components/SEO";
import Heading from "../components/heading";

const Error = (): JSX.Element => {
  return (
    <>
      <SEO title="Page not found" />
      <Main>
        <div className="flex flex-col text-center">
          <Heading>The page does not exist.</Heading>
          <NextLink href="/" passHref>
            <a>
              <div className="relative w-[200px] h-[200px] overflow-hidden">
                <Image
                  src={Emoji}
                  alt="Emoji thinking"
                  objectFit="cover"
                  layout="fill"
                />
              </div>
            </a>
          </NextLink>
          <p className="text-3xl">Error 404</p>
        </div>
      </Main>
    </>
  );
};

export default Error;
