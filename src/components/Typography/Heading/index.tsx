import { Slot } from "@radix-ui/react-slot";
import { ComponentProps, forwardRef } from "react";
import { VariantProps, tv } from "tailwind-variants";

const heading = tv({
  base: "font-sans text-zinc-900 font-bold",
  variants: {
    size: {
      sm: "text-lg",
      md: "text-xl",
      lg: "text-2xl",
      xl: "text-3xl",
    },
    truncate: {
      true: "truncate"
    },
  },
  defaultVariants: {
    size: "md",
    truncate: true,
  },
});

export interface HeadingProps
  extends ComponentProps<"h2">,
    VariantProps<typeof heading> {
  asChild?: boolean;
}

const Heading = forwardRef<HTMLHeadingElement, HeadingProps>(
  ({ children, asChild, size, truncate, className, title, ...props }, ref) => {
    const Component = asChild ? Slot : "h2";

    return (
      <Component
        className={heading({ size, truncate, className })}
        title={title}
        {...props}
        ref={ref}
      >
        {children}
      </Component>
    );
  }
);

Heading.displayName = "Heading";

export { Heading };
