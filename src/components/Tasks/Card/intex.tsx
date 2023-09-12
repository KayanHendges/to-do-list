import { Text } from "@/components/Typography/Text";
import { PencilSimple } from "phosphor-react";
import { ComponentProps } from "react";
import { twMerge } from "tailwind-merge";

interface Props extends ComponentProps<"div"> {
  task: ITask;
}

export default function TaskCard({ task, className, ...props }: Props) {
  return (
    <div
      className={twMerge(
        "w-full flex flex-col rounded border-[1px]",
        "p-2 group",
        className
      )}
      {...props}
    >
      <div className="w-full flex items-center">
        <Text size="lg" className="font-bold">
          {task.title}
        </Text>
        <div
          className={twMerge(
            "opacity-0 group-hover:opacity-100 ml-auto text-primary p-2 rounded hover:bg-primary",
            "hover:text-white transition-colors cursor-pointer"
          )}
        >
          <PencilSimple size={20} />
        </div>
      </div>
    </div>
  );
}
