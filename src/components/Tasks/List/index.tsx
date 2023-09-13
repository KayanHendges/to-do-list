import TaskCard from "@/components/Tasks/Card/intex";
import { Heading } from "@/components/Typography/Heading";
import { TaskContext } from "@/contexts/Task";
import { ComponentProps, useContext, useMemo } from "react";
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
  const { tasks } = useContext(TaskContext);
  const list = useMemo(
    () => tasks.filter((it) => it.status === status),
    [status, tasks]
  );

  const taskConfg = taskMapper[status];

  return (
    <div
      className={twMerge("flex-1 flex h-full flex-col", className)}
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
          "w-full flex-1 relative flex overflow-y-auto"
        )}
      >
        <div className=" w-full flex absolute flex-col gap-4 py-4">
          {list.map((task) => (
            <TaskCard
              key={task.id}
              task={task}
              onClick={() => onTaskClick(task)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
