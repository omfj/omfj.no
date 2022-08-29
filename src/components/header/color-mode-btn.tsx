import { FiMoon, FiSun } from "react-icons/fi";
import { useEffect, useState } from "react";
import Head from "next/head";

interface Props {
  isMobile?: boolean;
}

const ColorModeBtn = ({ isMobile }: Props) => {
  const [darkMode, setDarkMode] = useState<boolean | undefined>(undefined);
  const iconSize = isMobile ? 40 : 30;

  useEffect(() => {
    setDarkMode(document.documentElement.classList.contains("dark"));
  }, []);

  useEffect(() => {
    if (
      (darkMode && !document.documentElement.classList.contains("dark")) ||
      (!("omfjDarkMode" in localStorage) &&
        window.matchMedia("(prefers-color-scheme: dark)").matches)
    ) {
      window.document.documentElement.classList.add("dark");
      localStorage.setItem("omfjDarkMode", "true");
    } else {
      window.document.documentElement.classList.remove("dark");
      localStorage.setItem("omfjDarkMode", "false");
    }
  }, [darkMode]);

  const changeColorMode = () => {
    setDarkMode(!darkMode);
  };

  return (
    <>
      <Head>
        <meta name="theme-color" content={darkMode ? "#222" : "#eee"} />
      </Head>
      <div
        className={`w-fit transition-colors dark:text-gray-400 ${
          isMobile
            ? "text-neutral-900 dark:text-slate-50 p-2"
            : "text-neutral-500"
        } hover:text-neutral-900 dark:hover:text-slate-50 hover:cursor-pointer`}
        onClick={changeColorMode}
      >
        {darkMode ? <FiSun size={iconSize} /> : <FiMoon size={iconSize} />}
      </div>
    </>
  );
};

export default ColorModeBtn;
