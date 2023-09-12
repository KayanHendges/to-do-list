import Button from "@/components/Buttons/Button";
import UpdateTaskForm from "@/components/Forms/UpdateTask";
import { Modal } from "@/components/Modal";
import { Profile } from "@/components/Profile";
import DeletetTaskModal from "@/components/Tasks/DeleteTaskModal";
import { Text } from "@/components/Typography/Text";
import useDoc from "@/hooks/firestore/useDoc";
import { DateTime } from "luxon";
import { ComponentProps, useState } from "react";

interface Props extends ComponentProps<"div"> {
  task: ITask;
  onClose: () => void;
}

export default function TaskModal({ task, onClose, ...props }: Props) {
  const { doc: streamTask } = useDoc<ITask>("tasks", task.id);
  const [deleteAlert, setDeleteAlert] = useState<boolean>(false);

  const created = DateTime.fromMillis(task.createdAt).toFormat(
    "dd/MM/yyyy hh:mm"
  );

  return (
    <>
      {deleteAlert && (
        <DeletetTaskModal className="z-30" task={task} onClose={() => setDeleteAlert(false)} />
      )}
      <Modal.Root size="md" onClose={() => onClose()} {...props}>
        <Modal.Header title="Editar Tarefa" />
        <Modal.Body>
          {streamTask && <UpdateTaskForm task={streamTask} />}
        </Modal.Body>
        <Modal.Footer>
          <div className="flex items-center gap-2">
            <Profile.Root userId={task.createdBy}>
              <Profile.Avatar size="sm" />
              <Profile.Content>
                <Profile.Name
                  shortName
                  format={(name) => `Criado por ${name}`}
                />
              </Profile.Content>
            </Profile.Root>
            <Text>{created}</Text>
          </div>
          <div className="flex items-center gap-2">
            <Button onClick={() => setDeleteAlert(true)}>Excluir</Button>
            <Button onClick={() => onClose()} primary>
              Fechar
            </Button>
          </div>
        </Modal.Footer>
      </Modal.Root>
    </>
  );
}
