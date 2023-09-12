import { forwardRef } from "react";
import { twMerge } from "tailwind-merge";
import { ComponentProps } from "react";

interface Props extends ComponentProps<"textarea"> {}

const Textarea = forwardRef<HTMLTextAreaElement, Props>(
  ({ className, ...props }, ref) => {
    return (
      <textarea
        ref={ref}
        className={twMerge(
          "w-full p-2 outline-none bg-transparent focus:bg-zinc-100 rounded-lg",
          "border-2 hover:border-primary-light focus:border-primary",
          "text-zinc-800 transition-colors resize-none",
          className
        )}
        {...props}
      />
    );
  }
);

Textarea.displayName = "Textarea";

export default Textarea;
