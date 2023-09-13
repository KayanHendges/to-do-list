import StatusField from "@/components/Fields/Status";
import UsersField from "@/components/Fields/Users";
import TextInput from "@/components/Inputs/Text";
import Textarea from "@/components/Inputs/Textarea";
import TaskLock from "@/components/Tasks/TaskLock";
import { UserContext } from "@/contexts/User/UserContext";
import { taskProvider } from "@/providers/firestore/task";
import { UpdatePayload } from "@/providers/firestore/types";
import { ComponentProps, useContext, useEffect } from "react";
import { useForm } from "react-hook-form";
import { twMerge } from "tailwind-merge";

interface Props extends ComponentProps<"form"> {
  task: ITask;
}

export default function UpdateTaskForm({ task, className, ...props }: Props) {
  const { user } = useContext(UserContext);

  const isOwner = user?.id === task.createdBy;
  const canEdit = isOwner || !task.locked;
  const displayLock = isOwner || task.locked;

  const handleData = async (payload: UpdatePayload<ITask>) => {
    // TO DO handle error
    if (task.locked && !isOwner) return;

    await taskProvider.update(payload, task.id);
  };

  const handlePublicData = async (payload: UpdatePayload<ITask>) => {
    await taskProvider.update(payload, task.id);
  };

  const form = useForm({
    defaultValues: {
      title: task.title,
      description: task.description,
    },
  });

  useEffect(() => {
    form.setValue("title", task.title);
  }, [form, task.title]);

  useEffect(() => {
    form.setValue("description", task.description);
  }, [form, task.description]);

  return (
    <form
      className={twMerge("h-full flex flex-col gap-4", className)}
      {...props}
    >
      <div className="w-full flex justify-between items-center gap-4">
        <TextInput
          disabled={!canEdit}
          {...form.register("title")}
          onBlur={({ target }) => handleData({ title: target.value })}
        />
        {displayLock && (
          <TaskLock
            isOwner={isOwner}
            task={task}
            onHandle={(locked) => handleData({ locked })}
          />
        )}
      </div>
      <Textarea
        className="flex-1"
        disabled={!canEdit}
        {...form.register("description")}
        onBlur={({ target }) =>
          handleData({ description: target.value || null })
        }
      />
      <div className="w-full flex justify-between items-center gap-4">
        <UsersField
          className="flex-1"
          placement="top"
          label="Atribuído"
          selected={task.assigneeId}
          onUserSelect={({ id }) => handlePublicData({ assigneeId: id })}
        />
        <StatusField
          className="flex-1"
          placement="top"
          label="Status"
          selected={task.status}
          onStatusSelect={(status) => handlePublicData({ status })}
        />
      </div>
    </form>
  );
}
