import { motion } from "framer-motion";
import NextLink from "next/link";
import { Category } from "../sanity/types";
import CategoryTag from "./category-tag";

interface Props {
  title: string;
  desc: string;
  link: string;
  categories: Array<Category>;
}

const ProjectBox = ({ title, desc, link, categories }: Props): JSX.Element => (
  <motion.div
    className="my-10 max-w-xl m-auto flex flex-col"
    initial={{ opacity: 0, y: 100 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5 }}
    viewport={{ once: true }}
  >
    <p className="font-bold text-2xl py-2 px-4 w-fit border-b-2 dark:border-slate-50">
      {title}
    </p>
    <div className="float-left text-xl border-l-2 dark:border-slate-50 py-4 px-3">
      <p>{desc}</p>
      <div className="flex-wrap flex gap-2 my-2">
        {categories.map((category: Category) => (
          <CategoryTag
            key={category._id}
            slug={category.slug}
            emoji={category.emoji ?? ""}
            title={category.title}
            style={{
              backgroundColor: category.color + "22" ?? "transparent",
            }}
          />
        ))}
      </div>
    </div>
    <div>
      <NextLink href={"/projects/" + link} passHref>
        <div className="text-xl border-2 h-fit w-fit p-3 hover:cursor-pointer transition-colors hover:bg-neutral-200 dark:hover:bg-neutral-800">
          <a>
            <p>Learn More</p>
          </a>
        </div>
      </NextLink>
    </div>
  </motion.div>
);

export default ProjectBox;
