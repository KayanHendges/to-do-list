import Button from "@/components/Buttons/Button";
import TextInput from "@/components/Inputs/Text";
import Textarea from "@/components/Inputs/Textarea";
import { Profile } from "@/components/Profile";
import { UserContext } from "@/contexts/User/UserContext";
import { taskProvider } from "@/providers/firestore/task";
import { UpdatePayload } from "@/providers/firestore/types";
import { Lock } from "phosphor-react";
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
  const isCurrentAssignee = user?.id === task.assigneeId;

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
          <Lock
            className={twMerge(
              "rounded p-2 transition-colors",
              isOwner
                ? "hover:bg-zinc-200 hover:text-black cursor-pointer"
                : "cursor-not-allowed",
              task.locked ? "text-primary" : "text-zinc-400"
            )}
            onClick={() => isOwner && handleData({ locked: !task.locked })}
            size={48}
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
        {task.assigneeId ? (
          <Profile.Root
            userId={task.assigneeId}
            onClick={() =>
              isCurrentAssignee && handlePublicData({ assigneeId: null })
            }
            className={
              isCurrentAssignee
                ? "hover:bg-zinc-200 rounded-lg transition-colors cursor-pointer"
                : ""
            }
          >
            <Profile.Avatar size="sm" />
            <Profile.Content>
              <Profile.Name
                shortName
                format={(name) =>
                  isCurrentAssignee ? "Desatribuír-se" : `Atribuído a ${name}`
                }
                className={isCurrentAssignee ? "text-primary" : ""}
              />
            </Profile.Content>
          </Profile.Root>
        ) : (
          <Button
            onClick={() => handlePublicData({ assigneeId: user?.id })}
            primary
          >
            Atribuír-se a tarefa
          </Button>
        )}
      </div>
    </form>
  );
}
