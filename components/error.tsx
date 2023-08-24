type ErrorBoxProps = {
  title?: string;
  message: string;
};

export const ErrorBox = ({
  title = "Something went wrong!",
  message,
}: ErrorBoxProps) => {
  return (
    <div className="mx-auto max-w-xl rounded-lg border-2 border-red-400 bg-red-400/10 p-3 text-center">
      <h2 className="mb-3 text-xl font-semibold">{title}</h2>
      <p>{message}</p>
    </div>
  );
};
