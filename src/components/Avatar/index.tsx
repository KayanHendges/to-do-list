import { ComponentProps } from "react";
import { VariantProps, tv } from "tailwind-variants";

const avatar = tv({
  base: "rounded-full border-zinc-800 overflow-hidden",
  variants: {
    size: {
      sm: "w-12 h-12  border-2",
      md: "w-16 h-16 border-2",
      lg: "w-20 h-20 border-4",
    },
    isOnline: { true: "border-green-500" },
  },
  defaultVariants: {
    size: "md",
    isOnline: false,
  },
});

interface Props extends ComponentProps<"div">, VariantProps<typeof avatar> {
  photoURL?: string;
}

export default function Avatar({
  photoURL,
  size,
  isOnline,
  className,
  ...props
}: Props) {
  return (
    <div className={avatar({ size, isOnline, className })} {...props}>
      <img  className="w-full h-full" src={photoURL || "avatar.jpg"} />
    </div>
  );
}
