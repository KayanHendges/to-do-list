import { ComponentProps } from "react";
import { twMerge } from "tailwind-merge";

interface Props extends ComponentProps<"button"> {
  isLoading?: boolean;
  primary?: boolean;
}

export default function Button({
  className,
  children,
  primary,
  isLoading,
  ...props
}: Props) {
  return (
    <button
      data-loading={isLoading || undefined}
      data-primary={primary}
      className={twMerge("btn text-white data-[primary]:btn-primary data-[primary]:text-white", className)}
      {...props}
    >
      {isLoading ? <span className="loading loading-spinner" /> : children}
    </button>
  );
}
