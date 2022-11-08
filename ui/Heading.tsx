import { ReactNode } from "react";

interface Props {
  children: ReactNode;
}

const Heading = ({ children }: Props) => (
  <h1 className="text-4xl font-bold mb-3">{children}</h1>
);

export default Heading;
