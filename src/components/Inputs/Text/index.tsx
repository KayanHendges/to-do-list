import { Fragment, forwardRef } from "react";
import { twMerge } from "tailwind-merge";
import { ComponentProps } from "react";

interface InputTextProps extends ComponentProps<"input"> {
  label?: string;
}

const TextInput = forwardRef<HTMLInputElement, InputTextProps>(
  ({ className, label, ...props }, ref) => {
    const Container = label ? "div" : Fragment;

    return (
      <Container>
        {label && <label className="label">{label}</label>}
        <input
          ref={ref}
          type="text"
          className={twMerge(
            "input input-bordered input-primary w-full bg-zinc-100 text-black",
            "disabled:bg-zinc-100 disabled:border-primary",
            className
          )}
          {...props}
        />
      </Container>
    );
  }
);

TextInput.displayName = "TextInput";

export default TextInput;
