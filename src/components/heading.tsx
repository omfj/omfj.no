import { CSSProperties } from "react";

interface Props {
  children: React.ReactNode;
  style?: CSSProperties;
}

const Heading = ({ style, children }: Props) => (
  <h1 className={"font-bold text-center text-5xl p-2"} style={{ ...style }}>
    {children}
  </h1>
);

export default Heading;
