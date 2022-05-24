interface Props {
  title: string;
}

const Construction = ({ title }: Props): JSX.Element => {
  return (
    <div className="construction">
      <div className="flex flex-col bg-slate-50 dark:bg-[#070707] p-10 rounded border-2 border-[#070707]">
        <p className="text-3xl font-bold">{title}</p>
        <p className="text-xl">
          🚧 Hey! You have entered a construction site! Come back later. 🚧
        </p>
      </div>
    </div>
  );
};

export default Construction;
