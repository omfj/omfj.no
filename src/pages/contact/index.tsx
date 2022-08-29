import Main from "../../components/main";
import SEO from "../../components/SEO";
import Heading from "../../components/heading";
import {
  FaGithubAlt,
  FaKeybase,
  FaLinkedinIn,
  FaTwitter,
} from "react-icons/fa";
import Link from "next/link";

const ContactPage = (): JSX.Element => (
  <>
    <SEO title="contact" />
    <Main>
      <Heading className="mb-5">Contact</Heading>
      <div className="flex flex-col gap-10">
        <div className="text-center text-lg max-w-xl m-auto">
          <p>
            Feel free to contact me if you have any inquiries. You can try one
            of the socials below or send an email to{" "}
            <a
              className="text-cyan-600 hover:underline"
              href="mailto:hei@omfj.no?body=Hei%20Ole%20Magnus!"
            >
              <b>hei@omfj.no</b>
            </a>
            .
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 w-fit m-auto gap-6">
          <SocialsIcon
            icon={<FaGithubAlt />}
            platform="Github"
            username="@omfj"
            to="https://github.com/omfj"
          />
          <SocialsIcon
            icon={<FaLinkedinIn />}
            platform="LinkedIn"
            username="omfj"
            to="https://linkedin.com/in/omfj"
          />
          <SocialsIcon
            icon={<FaKeybase />}
            platform="Keybase"
            username="@omfj"
            to="https://keybase.io/omfj"
          />
          <SocialsIcon
            icon={<FaTwitter />}
            platform="Twitter"
            username="@omfj_"
            to="https://twitter.com/omfj_"
          />
        </div>
        <div>
          <p className="text-center text-lg">
            My PGP key ID:{" "}
            <a
              className="text-blue-400 visited:text-purple-400 underline"
              target="_blank"
              rel="noopener noreferrer"
              href="/pgp-key.asc"
              download="omfj-pgp-key.asc"
            >
              CA2C 0707 5170 9E32 343F 6D58 A20C 4384 0D84 1F41
            </a>
          </p>
        </div>
      </div>
    </Main>
  </>
);

interface SocialsIconProps {
  icon: React.ReactNode;
  platform: string;
  username: string;
  to: string;
}

const SocialsIcon = ({
  icon,
  platform,
  username,
  to,
}: SocialsIconProps): JSX.Element => (
  <a
    className="transition-colors bg-blue-400 hover:bg-blue-200 hover:text-black rounded-md text-xl px-3 py-2"
    href={to}
    target="_blank"
    rel="noreferrer"
  >
    <div className="flex flex-row gap-3 items-center w-fit m-auto">
      {icon} {platform} as {username}
    </div>
  </a>
);

export default ContactPage;
