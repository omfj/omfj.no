import NextLink from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";

interface Props {
  source: any;
  href: string;
  alt: string;
}

const SocialMediaImg = ({ source, href, alt }: Props): JSX.Element => {
  return (
    <NextLink href={href} passHref>
      <a>
        <motion.div
          whileHover={{ scale: 1.1 }}
          transition={{ duration: 0.2, ease: "easeInOut" }}
          className="w-[125px] h-[125px] m-auto initial hover:curosr-pointer"
        >
          <Image src={source} alt={alt} />
        </motion.div>
      </a>
    </NextLink>
  );
};

export default SocialMediaImg;
