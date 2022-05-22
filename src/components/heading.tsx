import { CSSProperties } from "react";

interface Props {
  children: string;
  style?: CSSProperties;
}

const Heading = ({ style, children }: Props) => (
  <h1 className={"font-bold text-center text-4xl p-2"} style={{ ...style }}>
    {children}
  </h1>
);

export default Heading;
