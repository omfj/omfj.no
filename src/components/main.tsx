interface Props {
  children: React.ReactNode;
}

const Main = ({ children }: Props): JSX.Element => {
  return (
    <div className="m-auto overflow-hidden max-w-[1000px] w-[100%] my-10 px-5">
      {children}
    </div>
  );
};

export default Main;
