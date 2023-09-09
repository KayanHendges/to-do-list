import { ComponentProps } from "react";
import { twMerge } from "tailwind-merge";

interface Props extends ComponentProps<"div"> {}

export default function AppContainer({ className, ...props }: Props) {
  return <div className={twMerge("w-screen h-screen bg-zinc-50", className)} {...props}></div>;
}
