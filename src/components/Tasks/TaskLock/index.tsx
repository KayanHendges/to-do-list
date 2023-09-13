import { Lock, LockOpen } from "phosphor-react";
import { twMerge } from "tailwind-merge";

interface Props {
  task: ITask;
  onHandle: (task: boolean) => void;
  isOwner: boolean;
}

export default function TaskLock({ task, isOwner, onHandle }: Props) {
  if (task.locked)
    return (
      <Lock
        className={twMerge(
          "rounded text-primary p-2 transition-colors",
          isOwner ? "hover:bg-zinc-200 cursor-pointer" : "cursor-not-allowed"
        )}
        onClick={() => isOwner && onHandle(false)}
        size={48}
      />
    );

  return (
    <LockOpen
      className={twMerge(
        "rounded text-zinc-400 p-2 transition-colors",
        isOwner
          ? "hover:bg-zinc-200 hover:text-black cursor-pointer"
          : "cursor-not-allowed"
      )}
      onClick={() => isOwner && onHandle(true)}
      size={48}
    />
  );
}
