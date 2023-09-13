import { Fragment, forwardRef } from "react";
import { twMerge } from "tailwind-merge";
import { ComponentProps } from "react";
import { Text } from "@/components/Typography/Text";

interface Props extends ComponentProps<"input"> {
  label?: string;
}

const TextInput = forwardRef<HTMLInputElement, Props>(
  ({ className, label, ...props }, ref) => {
    const Container = label ? "div" : Fragment;

    return (
      <Container>
        {label && <Text className="ml-2 font-medium">{label}</Text>}
        <input
          ref={ref}
          type="text"
          className={twMerge(
            "w-full p-2 outline-none bg-transparent hover:bg-zinc-100 focus:bg-zinc-100 rounded-lg",
            "border-2 hover:border-primary-light focus:border-primary",
            "text-zinc-800 font-medium text-xl transition-colors",
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
