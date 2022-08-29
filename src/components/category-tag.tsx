import NextLink from "next/link";

interface Props {
  slug: string;
  emoji: string;
  title: string;
  color: string;
  className?: string;
}

const CategoryTag = ({ slug, emoji, title, color, className }: Props) => {
  return (
    <NextLink href={"/category/" + slug} passHref>
      <a>
        <div
          className={`mt-2 py-1 transition-colors items-center px-2 text-md rounded border w-fit dark:border-transparent hover:cursor-pointer hover:border-cyan-400 dark:hover:border-cyan-400 ${className}`}
          style={{ backgroundColor: color ? color + 33 : "transparent" }}
        >
          <p>{`${emoji} ${title}`}</p>
        </div>
      </a>
    </NextLink>
  );
};

export default CategoryTag;
