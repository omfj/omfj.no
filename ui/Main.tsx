import { ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

const Main = ({ children }: Props) => (
  <main className="mx-auto max-w-2xl px-5 md:px-10">{children}</main>
);

export default Main;
