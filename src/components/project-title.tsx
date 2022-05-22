interface Props {
  title: string;
}

const ProjectTitle = ({ title }: Props): JSX.Element => {
  return <p className="text-3xl mb-5 text-center">{title}</p>;
};

export default ProjectTitle;
