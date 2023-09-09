import { FireStoreProvider } from "@/providers/firestore";

class TaskProvider extends FireStoreProvider<ITask> {
  constructor() {
    super("tasks");
  }
}

export const taskProvider = new TaskProvider();
