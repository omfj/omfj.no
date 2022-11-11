import Link from 'next/link';
import ProjectAPI from '@/lib/projects';
import Heading from '@/ui/Heading';
import Main from '@/ui/Main';

const Page = async () => {
  const projects = await ProjectAPI.getOverview();

  return (
    <Main>
      <Heading>Projects</Heading>
      <ul className="mt-10 flex flex-col gap-8">
        {projects.length > 0 ? (
          projects.map((project) => (
            <li key={project._id} className="flex flex-col gap-2">
              <div className="flex flex-col gap-2 py-2">
                <h2 className="text-2xl font-bold">{project.title}</h2>
                <p>Last updated: {project._updatedAt.toLocaleDateString()}</p>
              </div>
              <hr />
              <p className="mb-2 text-faded">{project.description}</p>
              <Link
                className="hover:underline"
                href={`/projects/${project.slug}`}
              >
                Read more &rarr;
              </Link>
            </li>
          ))
        ) : (
          <p className="text-center text-2xl">No projects found.</p>
        )}
      </ul>
    </Main>
  );
};

export default Page;
