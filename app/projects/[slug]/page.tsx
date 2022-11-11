import Markdown from 'react-markdown';
import Heading from '@/ui/Heading';
import Main from '@/ui/Main';
import ProjectAPI, { PageProps } from '@/lib/projects';
import Tag from '@/ui/Tag';
import Link from 'next/link';

export const generateStaticParams = async () => {
  const slugs = await ProjectAPI.getSlugs();

  return slugs.map((slug) => ({
    slug,
  }));
};

const Page = async ({ params }: PageProps) => {
  const project = await ProjectAPI.getProject(params?.slug);

  return (
    <Main>
      {/* Project header */}
      <Heading>{project.title}</Heading>
      <p>Last updated: {new Date(project._updatedAt).toLocaleDateString()}</p>

      <hr className="my-2" />

      {/* Project body */}
      <Markdown className="markdown mb-3">{project.body}</Markdown>

      {/* Project footer */}
      <div className="flex flex-col gap-5">
        {project.categories.length > 0 && (
          <div className="mx-auto flex w-fit flex-wrap gap-2">
            {project.categories.map((category) => (
              <Tag
                key={category._id}
                to={`/categories/${category.slug}`}
                color={category.color}
              >
                {category.emoji} {category.title}
              </Tag>
            ))}
          </div>
        )}

        {project.externalLinks.length > 0 && (
          <div className="mx-auto w-fit">
            <ul className="flex gap-5">
              {project.externalLinks.map((link) => (
                <Link key={link._key} href={link.link}>
                  <li className="border-1 rounded-md border px-2 py-1 transition-transform hover:scale-110">
                    {link.title} &rarr;
                  </li>
                </Link>
              ))}
            </ul>
          </div>
        )}
      </div>
    </Main>
  );
};

export default Page;
