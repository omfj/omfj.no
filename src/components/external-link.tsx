import { motion } from "framer-motion";

interface Props {
  title: string;
  to: string;
}

const ExternalLink = ({ title, to }: Props): JSX.Element => (
  <a href={to} target="_blank" rel="noreferrer">
    <motion.div
      initial={{ scale: 1 }}
      whileHover={{ scale: 1.1 }}
      className="rounded-md text-xl border border-black dark:border-slate-50 p-2 hover:cursor-pointer"
    >
      <p className="px-2 font-normal">{title}</p>
    </motion.div>
  </a>
);

export default ExternalLink;
