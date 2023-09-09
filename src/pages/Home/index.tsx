import Button from "@/components/Buttons/Button";
import TaskList from "@/components/Tasks/List";
import { Heading } from "@/components/Typography/Heading";
import { taskProvider } from "@/providers/firestore/task";
import { useState } from "react";
import { twMerge } from "tailwind-merge";

export default function HomePage() {
  const [isCreating, setIsCreating] = useState<boolean>(false);

  const createTask = async () => {
    if (isCreating) return;
    setIsCreating(true);

    try {
      await taskProvider.create({
        title: "Nova tarefa",
        description: null,
        assigneeId: null,
        locked: false,
        status: "open",
      });
    } catch (error) {
      // TODO handle error
      console.error(error);
    }

    setIsCreating(false);
  };

  return (
    <div className="w-full h-full flex flex-col gap-4 px-8 pt-4">
      <div className="w-full items-center flex gap-2">
        <Heading size="xl" className="mr-auto ml-4">
          Tarefas
        </Heading>
        <Button>Filtros</Button>
        <Button primary onClick={createTask} isLoading={isCreating}>
          Criar
        </Button>
      </div>
      <div
        className={twMerge(
          "w-full h-full flex justify-between gap-4",
          "p-8 pb-0 bg-white rounded-lg"
        )}
      >
        <TaskList status="open" />
        <TaskList status="inProgress" />
        <TaskList status="done" />
      </div>
    </div>
  );
}
