import { ComponentProps } from "react";
import { twMerge } from "tailwind-merge";

interface Props extends ComponentProps<"div"> {
  isOpen: boolean;
}

export default function Drawer({
  isOpen,
  className,
  children,
  ...props
}: Props) {
  return (
    <div
      className={twMerge(
        "w-[400px] h-full absolute z-10 bg-zinc-50 transition-all",
        isOpen ? "translate-x-0" : "translate-x-full",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}
