import { ComponentProps } from "react";
import { VariantProps, tv } from "tailwind-variants";

const avatar = tv({
  base: "rounded-full border-zinc-800 overflow-hidden",
  variants: {
    size: {
      sm: "w-8 h-8  border",
      md: "w-12 h-12 border-2",
      lg: "w-24 h-24 border-4",
      xl: "w-32 h-32 border-4",
    },
    isOnline: { true: "border-green-500" },
  },
  defaultVariants: {
    size: "md",
    isOnline: false,
  },
});

export interface AvatarProps
  extends ComponentProps<"div">,
    VariantProps<typeof avatar> {
  photoURL?: string | null;
}

export default function Avatar({
  photoURL,
  size,
  isOnline,
  className,
  ...props
}: AvatarProps) {
  return (
    <div className={avatar({ size, isOnline, className })} {...props}>
      <img className="w-full h-full" src={photoURL || "avatar.jpg"} />
    </div>
  );
}
