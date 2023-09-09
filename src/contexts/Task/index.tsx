import useCollection from "@/hooks/firestore/useCollection";
import { ReactNode, createContext } from "react";

export const TaskContext = createContext({} as ITaskContext);

export default function TaskProvider({ children }: { children: ReactNode }) {
  const { list: tasks } = useCollection<ITask>("tasks");

  return (
    <TaskContext.Provider value={{ tasks }}>{children}</TaskContext.Provider>
  );
}
