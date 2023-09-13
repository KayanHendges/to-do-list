import Button from "@/components/Buttons/Button";
import Drawer from "@/components/Drawer";
import UsersField from "@/components/Fields/Users";
import { Heading } from "@/components/Typography/Heading";
import { QueryConstraint } from "firebase/firestore";
import { ComponentProps } from "react";
import { twMerge } from "tailwind-merge";

interface Props extends ComponentProps<"div"> {
  onClose: () => void;
  onFormChanges: (queries: QueryConstraint[]) => void;
}

export default function TaskFilters({
  onClose,
  className,
  onFormChanges,
  ...props
}: Props) {
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
        <UsersField label="Atribuído" />
        <UsersField label="Criiado por" />
      </div>
      <div className="flex justify-between border-t-2 border-zinc-200 p-4">
        <Button>Limpar Filtros</Button>
        <Button primary onClick={() => onClose()}>
          Fechar
        </Button>
      </div>
    </Drawer>
  );
}
