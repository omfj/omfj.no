import NextLink from "next/link";
import { motion } from "framer-motion";

interface Props {
  title: string;
  link: string;
}

const ExternalLink = ({ title, link }: Props): JSX.Element => (
  <NextLink href={link} passHref>
    <a>
      <motion.div
        initial={{ scale: 1 }}
        whileHover={{ scale: 1.1 }}
        className="rounded-md text-xl border border-black dark:border-slate-50 p-2 hover:cursor-pointer"
      >
        <p className="px-2 font-normal">{title}</p>
      </motion.div>
    </a>
  </NextLink>
);

export default ExternalLink;
