import Button from "@/components/Buttons/Button";
import { Modal } from "@/components/Modal";
import { Text } from "@/components/Typography/Text";
import { taskProvider } from "@/providers/firestore/task";
import { ComponentProps, useState } from "react";

interface Props extends ComponentProps<"div"> {
  task: ITask;
  onClose: () => void;
}

export default function DeletetTaskModal({ task, onClose, ...props }: Props) {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleDelete = async () => {
    if (isLoading) return;
    setIsLoading(true);

    try {
      await taskProvider.delete(task.id);
      onClose();
    } catch (error) {
      console.error(error);
    }

    setIsLoading(false);
  };

  return (
    <Modal.Root size="auto" onClose={() => onClose()} {...props}>
      <Modal.Header title="Excluir Tarefa"></Modal.Header>
      <Modal.Body>
        <Text size="xl">
          Você tem certeza que deseja excluíra tarefa <b>{task.title}</b>?
        </Text>
      </Modal.Body>
      <Modal.Footer className="justify-end">
        <Button onClick={() => onClose()}>Cancelar</Button>
        <Button onClick={() => handleDelete()} primary>
          Excluir
        </Button>
      </Modal.Footer>
    </Modal.Root>
  );
}
