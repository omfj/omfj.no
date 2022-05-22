import { FaGithubSquare, FaLinkedin } from "react-icons/fa";
import IconLink from "./icon-link";

const Footer = (): JSX.Element => {
  return (
    <div className="w-full">
      <p className="text-center">Made with ❤️ by Ole Magnus</p>

      <div className="items-center">
        <IconLink icon={FaGithubSquare} link="https://github.com/omfj/" />
        <IconLink icon={FaLinkedin} link="https://linkedin.com/in/omfj/" />
      </div>
    </div>
  );
};

export default Footer;
