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
  type = "button",
  disabled,
  ...props
}: Props) {
  return (
    <button
      data-loading={isLoading || undefined}
      data-primary={primary}
      disabled={isLoading || disabled}
      className={twMerge(
        "btn text-white hover:bg-zinc-800 data-[primary]:btn-primary data-[primary]:text-white",
        className
      )}
      type={type}
      {...props}
    >
      {isLoading ? <span className="loading loading-spinner" /> : children}
    </button>
  );
}
