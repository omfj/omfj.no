import clsx from "clsx";

type TitleProps = {
  className?: string;
  children: React.ReactNode;
};

export default function Title({className, children}: TitleProps) {
  return (
    <h1 className={clsx("mb-1 font-display text-3xl text-[#030303]", className)}>{children}</h1>
  );
}
