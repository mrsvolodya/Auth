type LoaderProps = {
  className?: string;
};
export function Loader({ className = "h-screen" }: LoaderProps) {
  let defaultStyle = "h-8 w-8 bg-white";

  if (!(className === "h-screen")) {
    defaultStyle = "h-2 w-2 bg-white";
  }
  return (
    <div className={`flex space-x-2 justify-center items-center  ${className}`}>
      <div
        className={`rounded-full animate-bounce [animation-delay:-0.3s] ${defaultStyle}`}
      ></div>
      <div
        className={`rounded-full animate-bounce [animation-delay:-0.15s] ${defaultStyle}`}
      ></div>
      <div className={`rounded-full animate-bounce ${defaultStyle}`}></div>
    </div>
  );
}
