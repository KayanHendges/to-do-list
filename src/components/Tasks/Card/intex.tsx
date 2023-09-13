import { Profile } from "@/components/Profile";
import { Text } from "@/components/Typography/Text";
import { Lock } from "phosphor-react";
import { ComponentProps } from "react";
import { twMerge } from "tailwind-merge";

interface Props extends ComponentProps<"div"> {
  task: ITask;
}

interface TaskConfig {
  title: string;
  className: string;
}

const statusTaskMapper: Record<TaskStatus, TaskConfig> = {
  open: { title: "Abertas", className: "border-l-yellow-500" },
  inProgress: { title: "Em progresso", className: "border-l-blue-500" },
  done: { title: "Concluídas", className: "border-l-green-500" },
};

export default function TaskCard({ task, className, ...props }: Props) {
  const statusTaskConfig = statusTaskMapper[task.status];

  return (
    <div
      className={twMerge(
        "w-full flex flex-col rounded border p-2 border-l-4 gap-2",
        "hover:bg-zinc-100 hover:-translate-y-1 hover:shadow-lg cursor-pointer transition-all",
        statusTaskConfig.className,
        className
      )}
      {...props}
    >
      <div className="w-full flex justify-between items-center">
        <Text size="lg" className="font-bold">
          {task.title}
        </Text>
        {task.locked && <Lock className="text-primary" size={24} />}
      </div>
      {task.description && (
        <Text className="line-clamp-3">{task.description}</Text>
      )}
      <div>
        {task.assigneeId && (
          <Profile.Root userId={task.assigneeId}>
            <Profile.Avatar size="sm" />
            <Profile.Content>
              <Profile.Name shortName />
            </Profile.Content>
          </Profile.Root>
        )}
      </div>
    </div>
  );
}
