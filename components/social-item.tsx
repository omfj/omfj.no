"use client";

import { motion, useAnimation } from "framer-motion";

const wiggleStrength = 10;

type SocialItemProps = {
  platform: string;
  username: string;
  url: string;
  logo: React.ReactNode;
};

export const SocialItem = ({
  platform,
  username,
  url,
  logo,
}: SocialItemProps) => {
  const controls = useAnimation();

  const handleHover = () => {
    controls.start({
      scale: [1, 1.1, 1.1, 1],
      rotate: [0, -wiggleStrength, wiggleStrength, 0],
      transition: {
        duration: 0.6,
        repeatType: "reverse",
      },
    });
  };

  const handleMouseLeave = () => {
    controls.set({
      scale: 1,
      rotate: 0,
    });
  };

  return (
    <li onMouseEnter={handleHover} onMouseLeave={handleMouseLeave}>
      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        className="flex flex-row items-center justify-between rounded-lg px-3 py-2 hover:bg-black/5"
      >
        <div className="flex flex-col text-left">
          <h2 className="text-xl font-medium">{platform}</h2>
          <p className="text-sm text-slate-700">{username}</p>
        </div>
        <motion.div animate={controls}>{logo}</motion.div>
      </a>
    </li>
  );
};
