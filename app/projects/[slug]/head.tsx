import ProjectAPI, { PageProps } from '@/lib/projects';

const Head = async ({ params }: PageProps) => {
  const projectMetaData = await ProjectAPI.getProject(params?.slug);

  return (
    <>
      <title>{projectMetaData.title}</title>
    </>
  );
};

export default Head;
