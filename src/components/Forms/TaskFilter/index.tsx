import Button from "@/components/Buttons/Button";
import Drawer from "@/components/Drawer";
import UsersField from "@/components/Fields/Users";
import TextInput from "@/components/Inputs/Text";
import { Heading } from "@/components/Typography/Heading";
import { TaskContext } from "@/contexts/Task";
import { ComponentProps, useContext } from "react";
import { twMerge } from "tailwind-merge";

interface Props extends ComponentProps<"div"> {}

export default function TaskFilters({ className, ...props }: Props) {
  const { taskFilterForm, isFiltersOpen, setIsFiltersOpen } =
    useContext(TaskContext);
  const { watch, setValue, register, reset } = taskFilterForm;

  const filters = watch();

  return (
    <Drawer
      isOpen={isFiltersOpen}
      className={twMerge("flex flex-col gap-4", className)}
      {...props}
    >
      <div className="w-full py-6 border-b-2 border-zinc-200">
        <Heading className="text-center" size="lg">Filtros</Heading>
      </div>
      <div className="flex-1 flex flex-col gap-2 px-4">
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
        <Button primary onClick={() => setIsFiltersOpen(false)}>
          Fechar
        </Button>
      </div>
    </Drawer>
  );
}
