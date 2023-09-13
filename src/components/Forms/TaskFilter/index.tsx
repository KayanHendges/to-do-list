import Button from "@/components/Buttons/Button";
import Drawer from "@/components/Drawer";
import UsersField from "@/components/Fields/Users";
import TextInput from "@/components/Inputs/Text";
import { Heading } from "@/components/Typography/Heading";
import { TaskContext } from "@/contexts/Task";
import { ComponentProps, useContext } from "react";
import { twMerge } from "tailwind-merge";

interface Props extends ComponentProps<"div"> {
  onClose: () => void;
}

export default function TaskFilters({ onClose, className, ...props }: Props) {
  const { taskFilterForm } = useContext(TaskContext);
  const { watch, setValue, register, reset } = taskFilterForm;

  const filters = watch();

  return (
    <Drawer
      className={twMerge("flex flex-col", className)}
      onClose={onClose}
      {...props}
    >
      <div className="w-full p-4 bg-primary">
        <Heading className="text-white text-center">Filtros</Heading>
      </div>
      <div className="flex-1 flex flex-col gap-2 p-4">
        <TextInput label="Título" {...register("title")} />
        <TextInput label="Descrição" {...register("description")} />
        <UsersField
          label="Atribuído"
          selected={filters.assignee}
          onUserSelect={(user) => setValue("assignee", user)}
        />
        <UsersField
          label="Criado por"
          onUserSelect={(user) => setValue("createdBy", user)}
          selected={filters.createdBy}
        />
      </div>
      <div className="flex justify-between border-t-2 border-zinc-200 p-4">
        <Button onClick={() => reset()}>Limpar Filtros</Button>
        <Button primary onClick={() => onClose()}>
          Fechar
        </Button>
      </div>
    </Drawer>
  );
}
