import Link from "next/link";

import { formatDate } from "@/lib/date";
import { ProjectOverview } from "@/lib/sanity/project/types";
import { Tag } from "./tag";

type ProjectPreviewProps = {
  project: ProjectOverview;
};

export const ProjectPreview = ({ project }: ProjectPreviewProps) => {
  return (
    <Link href={`/project/${project.slug}`}>
      <div className="group flex flex-col gap-2 px-3 py-6 hover:bg-neutral-500/5">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-light transition-all group-hover:underline">
            {project.title}
          </h2>
        </div>

        <div>
          {project.categories.map((category) => (
            <Tag key={category._id}>{category.title}</Tag>
          ))}
        </div>
      </div>
    </Link>
  );
};
