import { useComponentClick } from "@/hooks/dom";
import { sleep } from "@/utils/promises";
import { ComponentProps, useEffect, useRef, useState } from "react";
import { twMerge } from "tailwind-merge";

interface Props extends ComponentProps<"div"> {
  onClose: () => void;
}

export default function Drawer({
  onClose,
  className,
  children,
  ...props
}: Props) {
  const [isOpenState, setIsOpenState] = useState<boolean>(false);
  const drawerRef = useRef<HTMLDivElement>(null);

  useComponentClick({
    ref: drawerRef,
    onClickOutside: (e) => {
      e.preventDefault();
      isOpenState && closeModal();
    },
  });

  const openModal = async () => {
    await sleep(1);
    setIsOpenState(true);
  };

  const closeModal = async () => {
    setIsOpenState(false);
    await sleep(300);
    onClose();
  };

  useEffect(() => {
    openModal();
  }, []);

  return (
    <div
      className={twMerge(
        "w-screen h-screen flex justify-end absolute top-0 left-0 z-20 ",
        "bg-zinc-900 transition-opacity overflow-hidden",
        isOpenState ? "bg-opacity-50 opacity-100" : "bg-opacity-0 opacity-0"
      )}
    >
      <div
        ref={drawerRef}
        className={twMerge(
          "w-[400px] h-full bg-zinc-50 transition-all",
          !isOpenState && "translate-x-full",
          className
        )}
        {...props}
      >
        {children}
      </div>
    </div>
  );
}
