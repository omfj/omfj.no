import fs from "fs";
import path from "path";
import matter from "gray-matter";

const ROOT = process.cwd();
const PROJECTS_DIR = path.join(ROOT, "public", "static", "projects");

export interface StaticMeta {
  title: string;
  description: string;
  date: string;
  tags: Array<string>;
}

export const getProjectSlugs = async () => {
  const files = fs.readdirSync(PROJECTS_DIR);

  return files.map((file) => {
    return {
      params: {
        slug: file.replace(/\.(md|mdx)$/, ""),
      },
    };
  });
};

export const getProjectsData = async () => {
  const files = fs.readdirSync(PROJECTS_DIR, "utf-8");
  const allProjectsData = files.map((file) => {
    const slug = file.replace(/\.(md|mdx)$/, "");

    const filePath = path.join(PROJECTS_DIR, file);
    const fileContents = fs.readFileSync(filePath, "utf-8");
    const matterResult = matter(fileContents);

    return {
      slug,
      ...matterResult.data,
    };
  });

  return allProjectsData;
};

export const getProjectBySlug = async (slug: string) => {
  const filePath = path.join(PROJECTS_DIR, `${slug}.md`);
  const fileContents = fs.readFileSync(filePath, "utf-8");
  const { data, content } = matter(fileContents);

  return {
    data,
    content,
  };
};
