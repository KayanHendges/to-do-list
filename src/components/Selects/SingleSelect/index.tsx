"use client";

import { Text } from "@/components/Typography/Text";
import { useComponentClick } from "@/hooks/dom";
import {
  ChangeEvent,
  ComponentProps,
  ComponentPropsWithoutRef,
  MouseEvent,
  createContext,
  useContext,
  useRef,
  useState,
} from "react";
import { twMerge } from "tailwind-merge";

interface ISingleSelectContext {
  isModalOpen: boolean;
  setIsModalOpen: (value: boolean) => void;
  disabled?: boolean;
}

const SingleSelectContext = createContext({} as ISingleSelectContext);

export interface SingleSelectRootProps extends ComponentProps<"div"> {
  disabled?: boolean;
}

function SingleSelectRoot({
  className,
  children,
  disabled,
  ...props
}: SingleSelectRootProps) {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  return (
    <SingleSelectContext.Provider
      value={{ isModalOpen, setIsModalOpen, disabled }}
    >
      <div
        className={twMerge("w-full flex flex-col relative", className)}
        {...props}
      >
        {children}
      </div>
    </SingleSelectContext.Provider>
  );
}

interface SingleSelectLabelProps extends ComponentPropsWithoutRef<"span"> {}

function SingleSelectLabel({ className, ...props }: SingleSelectLabelProps) {
  return <Text className={twMerge("ml-2 font-medium", className)} {...props} />;
}

interface SingleSelectInputProps extends ComponentPropsWithoutRef<"input"> {
  hasTextInput?: boolean;
  onInputChanges?: (input: string) => void;
}

function SingleSelectInput({
  className,
  children,
  hasTextInput = true,
  onInputChanges,
  ...props
}: SingleSelectInputProps) {
  const [input, setInput] = useState<string>("");
  const { isModalOpen, setIsModalOpen, disabled } =
    useContext(SingleSelectContext);
  const hasElementChildren =
    children && typeof children !== "string" && !isModalOpen;

  const handleOnChange = (event: ChangeEvent<HTMLInputElement>) => {
    props.onChange && props.onChange(event);
    onInputChanges && onInputChanges(event.target.value);
    setInput(event.target.value);
  };

  const handleOnClick = (
    event: MouseEvent<HTMLInputElement, globalThis.MouseEvent>
  ) => {
    if (disabled) return;
    setIsModalOpen(true);
    props.onClick && props.onClick(event);
  };

  return (
    <div
      data-has-children={hasElementChildren || undefined}
      className={twMerge(
        "w-full flex group focus-within:bg-zinc-100 data-[has-children]:p-2",
        "rounded-lg border-2 hover:border-primary-light focus-within:border-primary",
        "text-zinc-800 font-medium text-xl truncates transition-colors",
        className
      )}
      onClick={handleOnClick}
    >
      {hasElementChildren ? (
        <span
          onClick={handleOnClick}
          className={twMerge(
            "flex-1 truncate",
            !isModalOpen && "cursor-pointer",
            disabled && "cursor-not-allowed"
          )}
        >
          {children}
        </span>
      ) : (
        <input
          type="text"
          className={twMerge(
            "flex-1 outline-none bg-transparent p-2",
            !isModalOpen && "cursor-pointer",
            disabled && "cursor-not-allowed"
          )}
          {...props}
          disabled={props.disabled || disabled}
          onChange={handleOnChange}
          onClick={handleOnClick}
          value={
            isModalOpen && hasTextInput
              ? input
              : typeof children === "string"
              ? children
              : ""
          }
        />
      )}
    </div>
  );
}

export type SelectPlacement = "top" | "bottom";

interface SingleSelectMenuProps extends ComponentPropsWithoutRef<"div"> {
  placement?: SelectPlacement;
}

function SingleSelectMenu({
  placement = "bottom",
  className,
  children,
  ...props
}: SingleSelectMenuProps) {
  const menuRef = useRef<HTMLDivElement>(null);
  const { isModalOpen, setIsModalOpen, disabled } =
    useContext(SingleSelectContext);

  useComponentClick({
    ref: menuRef,
    onClickOutside: () => {
      setIsModalOpen(false);
    },
  });

  if (!isModalOpen || disabled) return <></>;

  return (
    <div
      ref={menuRef}
      data-placement-top={placement === "top" || undefined}
      data-placement-bottom={placement === "bottom" || undefined}
      className={twMerge(
        "w-full max-h-96 absolute overflow-y-auto z-20",
        "bg-zinc-50 border-2 border-primary rounded-lg",
        "data-[placement-top]:bottom-full data-[placement-bottom]:top-full",
        className
      )}
      {...props}
    >
      <div className={twMerge("flex flex-col")}>{children}</div>
    </div>
  );
}

interface SingleSelectItemProps extends ComponentPropsWithoutRef<"span"> {
  selected?: boolean;
  hoverEffect?: boolean;
}

function SingleSelectItem({
  hoverEffect = true,
  selected,
  className,
  children,
  onClick,
  ...props
}: SingleSelectItemProps) {
  const { setIsModalOpen } = useContext(SingleSelectContext);

  return (
    <Text
      size="lg"
      className={twMerge(
        "p-2 transition-colors cursor-pointer",
        selected && "bg-primary text-white",
        hoverEffect && "hover:bg-primary hover:text-white",
        className
      )}
      onClick={(e) => {
        onClick && onClick(e);
        setIsModalOpen(false);
      }}
      {...props}
    >
      {children}
    </Text>
  );
}

const SingleSelect = {
  Root: SingleSelectRoot,
  Label: SingleSelectLabel,
  Input: SingleSelectInput,
  Menu: SingleSelectMenu,
  Item: SingleSelectItem,
};

export default SingleSelect;
