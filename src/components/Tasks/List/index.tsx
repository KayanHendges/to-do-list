import TaskCard from "@/components/Tasks/Card/intex";
import { Heading } from "@/components/Typography/Heading";
import useCollection from "@/hooks/firestore/useCollection";
import { where } from "firebase/firestore";
import { ComponentProps, useEffect } from "react";
import { twMerge } from "tailwind-merge";

interface Props extends ComponentProps<"div"> {
  status: TaskStatus;
  onTaskClick: (task: ITask) => void;
}

interface TaskConfig {
  title: string;
  className: string;
}

const taskMapper: Record<TaskStatus, TaskConfig> = {
  open: { title: "Abertas", className: "bg-yellow-500" },
  inProgress: { title: "Em progresso", className: "bg-blue-500" },
  done: { title: "Concluídas", className: "bg-green-500" },
};

export default function TaskList({
  status,
  className,
  onTaskClick,
  ...props
}: Props) {
  const { list: tasks } = useCollection<ITask>("tasks", {
    query: [where("status", "==", status)],
  });
  const taskConfg = taskMapper[status];
  
  return (
    <div
      className={twMerge("flex-1 flex flex-col gap-2", className)}
      {...props}
    >
      <div
        className={twMerge(
          "w-full flex justify-center px-4 py-2 truncate rounded",
          taskConfg.className
        )}
      >
        <Heading className="text-white">{taskConfg.title}</Heading>
      </div>
      <div
        className={twMerge(
          "flex-1 max-w-full w-full flex flex-col gap-2 overflow-y-auto"
        )}
      >
        {tasks.map((task) => (
          <TaskCard
            key={task.id}
            task={task}
            onClick={() => onTaskClick(task)}
          />
        ))}
      </div>
    </div>
  );
}
