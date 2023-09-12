import { forwardRef } from "react";
import { twMerge } from "tailwind-merge";
import { ComponentProps } from "react";

interface Props extends ComponentProps<"input"> {}

const TextInput = forwardRef<HTMLInputElement, Props>(
  ({ className, ...props }, ref) => {
    return (
      <input
        ref={ref}
        type="text"
        className={twMerge(
          "w-full p-2 outline-none bg-transparent hover:bg-zinc-100 focus:bg-zinc-200 rounded",
          "border-b-2 hover:border-primary-light focus:border-primary",
          "text-zinc-800 font-medium text-xl transition-colors",
          className
        )}
        {...props}
      />
    );
  }
);

TextInput.displayName = "TextInput";

export default TextInput;
