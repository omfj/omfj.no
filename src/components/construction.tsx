interface Props {
  title: string;
}

const Construction = ({ title }: Props): JSX.Element => {
  return (
    <div className="construction">
      <div className="flex flex-col bg-[#070707] p-10 rounded border-2 border-[#070707]">
        <p className="text-2xl">{title}</p>
        <p>Hey! You have entered a construction site! Come back later.</p>
      </div>
    </div>
  );
};

export default Construction;
