import NextLink from "next/link";
import { CSSProperties } from "react";

interface Props {
  slug: string;
  emoji: string;
  title: string;
  style?: CSSProperties;
}

const CategoryTag = ({ slug, emoji, title, style }: Props) => (
  <NextLink href={"/category/" + slug} passHref>
    <a>
      <div
        className="mt-2 py-1 transition-colors items-center px-2 text-md rounded border w-fit dark:border-transparent hover:cursor-pointer hover:border-cyan-400 dark:hover:border-cyan-400"
        style={{ ...style }}
      >
        <p>{emoji + " " + title}</p>
      </div>
    </a>
  </NextLink>
);

export default CategoryTag;
