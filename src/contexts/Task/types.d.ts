import { UseFormReturn } from "react-hook-form";

interface ITaskFilter {
  title: string;
  description: string;
  assignee: IUser | null;
  createdBy: IUser | null;
  // createdAt: Date;
}

interface ITaskContext {
  tasks: ITask[];
  taskFilterForm: UseFormReturn<ITaskFilter>;
}
