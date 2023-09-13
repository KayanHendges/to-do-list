import { Heading } from "@/components/Typography/Heading";
import { useComponentClick } from "@/hooks/dom";
import { sleep } from "@/utils/promises";
import {
  ComponentProps,
  ComponentPropsWithoutRef,
  useEffect,
  useRef,
  useState,
} from "react";
import { twMerge } from "tailwind-merge";
import { VariantProps, tv } from "tailwind-variants";

const modalRootVariant = tv({
  base: `max-w-full max-h-full flex flex-col rounded-2xl bg-zinc-50 transition-all`,
  variants: {
    size: {
      auto: "w-auto h-auto",
      sm: "w-1/3 h-2/5 min-w-[400px]",
      md: "w-2/4 h-3/5 min-w-[700px]",
      lg: "w-5/6 h-4/5",
    },
    open: {
      true: "scale-100 opacity-100",
      false: "scale-50 opacity-0",
    },
  },
  defaultVariants: {
    size: "auto",
    open: true,
  },
});

interface ModalRootProps
  extends ComponentPropsWithoutRef<"div">,
    Omit<VariantProps<typeof modalRootVariant>, "open"> {
  onClose: () => void;
}

const ModalRoot = ({
  onClose,
  children,
  className,
  size,
  ...props
}: ModalRootProps) => {
  const [isOpenState, setIsOpenState] = useState<boolean>(false);
  const modalRef = useRef<HTMLDivElement>(null);

  useComponentClick({
    ref: modalRef,
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
        "w-screen h-screen fixed top-0 left-0 z-20",
        "flex flex-col items-center justify-center p-4",
        "bg-zinc-900 transition-opacity",
        isOpenState ? "bg-opacity-50 opacity-100" : "bg-opacity-0 opacity-0",
        className
      )}
    >
      <div
        className={modalRootVariant({ open: isOpenState, size })}
        ref={modalRef}
        {...props}
      >
        {children}
      </div>
    </div>
  );
};

interface ModalHeaderProps extends ComponentProps<"div"> {
  title: string;
}

function ModalHeader({
  title,
  children,
  className,
  ...props
}: ModalHeaderProps) {
  return (
    <div className={twMerge("w-full p-3 bg-primary", className)} {...props}>
      {title && (
        <Heading size="sm" className="text-center text-white">
          {title}
        </Heading>
      )}
      {children}
    </div>
  );
}

interface ModalBodyProps extends ComponentProps<"div"> {}

function ModalBody({ children, className, ...props }: ModalBodyProps) {
  return (
    <div
      className={twMerge(
        "w-full flex-1 p-4 overflow-y-auto overflow-x-hidden",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}

interface ModalFooterProps extends ComponentProps<"div"> {}

function ModalFooter({ children, className, ...props }: ModalFooterProps) {
  return (
    <div
      className={twMerge(
        "w-full flex p-4 gap-2 justify-between items-center bg-zinc-100 border-t border-zinc-200",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}

export const Modal = {
  Root: ModalRoot,
  Header: ModalHeader,
  Body: ModalBody,
  Footer: ModalFooter,
};
