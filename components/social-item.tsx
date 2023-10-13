"use client";

import {
  GitHubLogoIcon,
  InstagramLogoIcon,
  LinkedInLogoIcon,
} from "@radix-ui/react-icons";
import { motion, useAnimation } from "framer-motion";

import { XIcon } from "@/components/icons/x";
import { SocialMedia } from "@/lib/sanity/settings/types";

const wiggleStrength = 10;

export function SocialItem({ platform, handle, url }: SocialMedia) {
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
        className="flex flex-row items-center justify-between px-3 py-2 hover:bg-neutral-500/5"
      >
        <div className="flex flex-col text-left">
          <h2 className="text-xl font-medium">{platform}</h2>
          <p className="text-sm text-slate-700">{handle}</p>
        </div>
        <motion.div animate={controls}>
          <SocialMediaLogo platform={platform} />
        </motion.div>
      </a>
    </li>
  );
}

const iconClasses = "h-8 w-8 text-slate-800";

export function SocialMediaLogo({ platform }: { platform: string }) {
  if (platform === "X") {
    return <XIcon className={iconClasses} />;
  }

  if (platform === "GitHub") {
    return <GitHubLogoIcon className={iconClasses} />;
  }

  if (platform === "Instagram") {
    return <InstagramLogoIcon className={iconClasses} />;
  }

  if (platform === "LinkedIn") {
    return <LinkedInLogoIcon className={iconClasses} />;
  }

  return null;
}
