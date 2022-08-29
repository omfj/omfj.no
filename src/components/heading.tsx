interface Props {
  children: React.ReactNode;
  className?: string;
}

const Heading = ({ children, className }: Props) => (
  <h1 className={`font-bold text-center text-3xl md:text-4xl p-2 ${className}`}>
    {children}
  </h1>
);

export default Heading;
