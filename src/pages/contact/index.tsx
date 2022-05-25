import Main from "../../components/main";
import SEO from "../../components/SEO";
import SocialMediaImg from "../../components/social-media-img";
import GithubImage from "../../../public/images/github.png";
import LinkedinImage from "../../../public/images/linkedin.png";
import Heading from "../../components/heading";

const Contact = (): JSX.Element => (
  <>
    <SEO title="contact" />
    <Main>
      <Heading>Contact</Heading>
      <div className="text-center text-lg">
        <p>Feel free to contact me if you have any inquiries.</p>
        <p>
          You can try one of the socials below or send an email to{" "}
          <a
            className="text-cyan-600 hover:underline"
            href="mailto:hei@omfj.no?body=Hei%20Ole%20Magnus!"
          >
            <b>hei@omfj.no</b>
          </a>
          .
        </p>
      </div>
      <div className="grid grid-cols-2 max-w-[400px] m-auto my-10">
        <SocialMediaImg
          source={GithubImage}
          href="https://github.com/omfj"
          alt="Github logo with link to my github."
        />
        <SocialMediaImg
          source={LinkedinImage}
          href="https://linkedin.com/in/omfj"
          alt="Linkedin logo with link to my linkedin"
        />
      </div>
    </Main>
  </>
);

export default Contact;
