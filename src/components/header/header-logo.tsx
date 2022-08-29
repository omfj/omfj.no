import NextLink from "next/link";
import { motion, useAnimation } from "framer-motion";
import { useState } from "react";

const HeaderLogo = () => {
  const [isAnimationPlaying, setIsAnimationPlaying] = useState(false);
  const divAnimationControls = useAnimation();
  const divAnimationVariants = {
    init: {
      scale: 1,
    },
    anim: {
      scale: 1.05,
    },
  };

  return (
    <NextLink href="/" passHref>
      <a>
        <motion.p
          animate={divAnimationControls}
          onHoverStart={() => {
            if (!isAnimationPlaying) {
              setIsAnimationPlaying(true);
              divAnimationControls.start(divAnimationVariants.anim);
            }
          }}
          onAnimationComplete={() => {
            divAnimationControls.start(divAnimationVariants.init);
            setIsAnimationPlaying(false);
          }}
          className={
            "py-3 text-transparent bg-clip-text bg-gradient-to-tr from-yellow-400 to-blue-500 text-4xl md:text-5xl font-bold font-comfortaa hover:cursor-pointer"
          }
        >
          omfj.no
        </motion.p>
      </a>
    </NextLink>
  );
};

export default HeaderLogo;
