import { ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

const Heading = ({ children }: Props) => (
  <h1 className="mb-3 text-4xl font-bold">{children}</h1>
);

export default Heading;
