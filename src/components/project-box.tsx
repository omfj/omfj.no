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
    className="my-4 flex flex-col"
    initial={{ opacity: 0 }}
    whileInView={{ opacity: 1 }}
    transition={{ duration: 0.5 }}
    viewport={{ once: true }}
  >
    <p className="font-bold text-lg py-2 px-4 w-fit border-b-2 border-white">
      {title}
    </p>
    <div className="float-left border-l-2 border-white py-4 px-3">
      <p>{desc}</p>
      <div className="flex-wrap flex gap-2">
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
        <div className="border-2 h-fit w-fit p-2 hover:cursor-pointer hover:bg-neutral-800">
          <a>
            <p>Learn More</p>
          </a>
        </div>
      </NextLink>
    </div>
  </motion.div>
);

export default ProjectBox;
