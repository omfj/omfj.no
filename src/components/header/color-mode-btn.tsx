import { FiMoon, FiSun } from "react-icons/fi";
import { useEffect, useState } from "react";

interface Props {
  isMobile?: boolean;
}

const ColorModeBtn = ({ isMobile }: Props) => {
  const [color, setColor] = useState("dark");
  const iconSize = isMobile ? 40 : 30;

  useEffect(() => {
    color === "dark"
      ? document.documentElement.classList.add("dark")
      : document.documentElement.classList.remove("dark");
  }, [color]);

  return (
    <div
      className={`w-fit transition-colors dark:text-gray-400 ${
        isMobile
          ? "text-neutral-900 dark:text-slate-50 p-2"
          : "text-neutral-500"
      } hover:text-neutral-900 dark:hover:text-slate-50 hover:cursor-pointer`}
      onClick={() => {
        color === "dark" ? setColor("light") : setColor("dark");
      }}
    >
      {color === "dark" ? (
        <FiSun size={iconSize} />
      ) : (
        <FiMoon size={iconSize} />
      )}
    </div>
  );
};

export default ColorModeBtn;
