type TaskStatus = "open" | "inProgress" | "done";

interface ITask {
  id: string;
  title: string;
  description: string | null;
  assigneeId: string | null;
  locked: boolean;
  status: TaskStatus;
  createdBy: string;
  createdAt: number;
}
