import { CSSProperties } from "react";

interface Props {
  children: React.ReactNode;
  className?: string;
  style?: CSSProperties;
}

const Heading = ({ children, className, style }: Props) => (
  <h1
    className={`font-bold text-center text-3xl md:text-4xl p-2 ${className}`}
    style={style ?? {}}
  >
    {children}
  </h1>
);

export default Heading;
