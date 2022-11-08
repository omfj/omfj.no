import Link from 'next/link';
import ProjectAPI from '@/lib/projects';
import Heading from '@/ui/Heading';
import Main from '@/ui/Main';

const Page = async () => {
  const projects = await ProjectAPI.getProjectsOverview();

  return (
    <Main>
      <Heading>Projects</Heading>
      <ul className="mt-10 flex flex-col gap-8">
        {projects.map((project) => (
          <li key={project._id} className="flex flex-col gap-2">
            <div className="border-b border-b-white">
              <h2 className="text-2xl">{project.title}</h2>
              <p className="mb-2">
                Last updated: {project._updatedAt.toLocaleDateString()}
              </p>
            </div>
            <p className="mb-2 text-faded">{project.description}</p>
            <Link
              className="hover:underline"
              href={`/projects/${project.slug}`}
            >
              Read more
            </Link>
          </li>
        ))}
      </ul>
    </Main>
  );
};

export default Page;
