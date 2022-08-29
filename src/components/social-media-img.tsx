import Image from "next/image";
import { motion } from "framer-motion";

interface Props {
  src: any;
  to: string;
  alt: string;
}

const SocialMediaImg = ({ src, to, alt }: Props): JSX.Element => {
  return (
    <a href={to} target="_blank" rel="noreferrer">
      <motion.div
        className={
          "w-[125px] h-[125px] m-auto initial invert bg-[#222] hover:curosr-pointer"
        }
      >
        <Image src={src} alt={alt} />
      </motion.div>
    </a>
  );
};

export default SocialMediaImg;
