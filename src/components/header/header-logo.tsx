import NextLink from "next/link";
import { motion } from "framer-motion";

const HeaderLogo = () => (
  <NextLink href="/" passHref>
    <a>
      <motion.p
        whileHover={{ scale: 1.05 }}
        className="text-extrabold text-4xl py-3 hover:cursor-pointer"
      >
        omfj.no
      </motion.p>
    </a>
  </NextLink>
);

export default HeaderLogo;
