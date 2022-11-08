import Markdown from 'react-markdown';
import Heading from '@/ui/Heading';
import Main from '@/ui/Main';
import ProjectAPI from '@/lib/projects';

interface PageProps {
  params: { slug: string };
}

export default async function Page({ params }: PageProps) {
  const project = await ProjectAPI.getProjectBySlug(params.slug);

  return (
    <Main>
      <Heading>{project.title}</Heading>
      <p>Last updated: {new Date(project._updatedAt).toLocaleDateString()}</p>
      <hr className="my-2" />
      <Markdown className="markdown">{project.body}</Markdown>
    </Main>
  );
}
