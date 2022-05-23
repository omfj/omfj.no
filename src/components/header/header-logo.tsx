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
          className="text-5xl font-bold font-mono py-3 hover:cursor-pointer"
        >
          omfj.no
        </motion.p>
      </a>
    </NextLink>
  );
};

export default HeaderLogo;
