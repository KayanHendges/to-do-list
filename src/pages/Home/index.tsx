import Button from "@/components/Buttons/Button";
import TaskList from "@/components/Tasks/List";
import TaskModal from "@/components/Tasks/Modal";
import { Heading } from "@/components/Typography/Heading";
import { UserContext } from "@/contexts/User/UserContext";
import { taskProvider } from "@/providers/firestore/task";
import { useContext, useState } from "react";
import { twMerge } from "tailwind-merge";

export default function HomePage() {
  const [isCreating, setIsCreating] = useState<boolean>(false);
  const [taskToUpdate, setTaskToUpdate] = useState<ITask | null>(null);
  const { user } = useContext(UserContext);

  const createTask = async () => {
    if (isCreating || !user) return;
    setIsCreating(true);

    try {
      await taskProvider.create({
        title: "Nova tarefa",
        description: null,
        assigneeId: null,
        locked: false,
        status: "open",
        createdBy: user?.id,
        createdAt: new Date().getTime(),
      });
    } catch (error) {
      // TODO handle error
      console.error(error);
    }

    setIsCreating(false);
  };

  return (
    <div className="w-full h-full flex flex-col gap-4 px-8 pt-4">
      {taskToUpdate && (
        <TaskModal task={taskToUpdate} onClose={() => setTaskToUpdate(null)} />
      )}
      <div className="w-full items-center flex gap-2">
        <Heading size="xl" className="mr-auto ml-4">
          Tarefas
        </Heading>
        <Button>Filtros</Button>
        <Button primary onClick={() => createTask()} isLoading={isCreating}>
          Criar
        </Button>
      </div>
      <div
        className={twMerge(
          "w-full h-full flex justify-between gap-4",
          "p-8 pb-0 bg-white rounded-lg"
        )}
      >
        <TaskList onTaskClick={setTaskToUpdate} status="open" />
        <TaskList onTaskClick={setTaskToUpdate} status="inProgress" />
        <TaskList onTaskClick={setTaskToUpdate} status="done" />
      </div>
    </div>
  );
}
