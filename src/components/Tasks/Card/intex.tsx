import { Text } from "@/components/Typography/Text";
import { ComponentProps } from "react";
import { twMerge } from "tailwind-merge";

interface Props extends ComponentProps<"div"> {
  task: ITask;
}

export default function TaskCard({ task, className, ...props }: Props) {
  return (
    <div
      className={twMerge("w-full flex flex-col rounded border-[1px]", "p-2", className)}
      {...props}
    >
      <div>
        <Text size="lg" className="font-bold">{task.title}</Text>
      </div>
    </div>
  );
}
