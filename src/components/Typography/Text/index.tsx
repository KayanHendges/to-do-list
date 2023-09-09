import { Slot } from "@radix-ui/react-slot";
import { ComponentProps, forwardRef } from "react";
import { VariantProps, tv } from "tailwind-variants";

const text = tv({
  base: "font-sans text-zinc-900",
  variants: {
    size: {
      sm: "text-xs",
      md: "text-sm",
      lg: "text-md",
      xl: "text-lg",
    },
    truncate: { true: "truncate" },
  },
  defaultVariants: {
    size: "md",
  },
});

export interface TextProps
  extends ComponentProps<"span">,
    VariantProps<typeof text> {
  asChild?: boolean;
}

const Text = forwardRef<HTMLSpanElement, TextProps>(
  ({ children, asChild, size, className, truncate, title, ...props }, ref) => {
    const Component = asChild ? Slot : "span";

    return (
      <Component
        className={text({ size, truncate, className })}
        title={title}
        {...props}
        ref={ref}
      >
        {children}
      </Component>
    );
  }
);

Text.displayName = "Text";

export { Text };
