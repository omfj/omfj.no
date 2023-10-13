type TagProps = {
  children: React.ReactNode;
};

export function Tag({ children }: TagProps) {
  return (
    <span className="mr-2 inline-block border border-neutral-600 px-2 py-1 text-xs text-neutral-600">
      {children}
    </span>
  );
}
