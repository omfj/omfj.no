interface Props {
  title: string;
  link: string;
}

const ExternalLink = ({ title, link }: Props): JSX.Element => (
  <a href={link} target="_blank" rel="noreferrer">
    <div
      className={
        "text-lg border-2 border-[#888] px-3 py-2 hover:cursor-pointer hover:border-[#333] dark:hover:border-white"
      }
    >
      <p>{title}</p>
    </div>
  </a>
);

export default ExternalLink;
