import { ITaskContext, ITaskFilter } from "@/contexts/Task/types";
import useCollection from "@/hooks/firestore/useCollection";
import { QueryConstraint, where } from "firebase/firestore";
import { ReactNode, createContext, useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";

export const TaskContext = createContext({} as ITaskContext);

export default function TaskProvider({ children }: { children: ReactNode }) {
  const [isFiltersOpen, setIsFiltersOpen] = useState<boolean>(false);

  const taskFilterForm = useForm<ITaskFilter>({
    defaultValues: {
      title: "",
      description: "",
      assignee: null,
      createdBy: null,
    },
  });

  const filters = taskFilterForm.watch();

  const { list, setQuery } = useCollection<ITask>("tasks");

  useEffect(() => {
    const queries: QueryConstraint[] = [];
    const { assignee, createdBy } = filters;

    if (assignee) queries.push(where("assigneeId", "==", assignee.id));

    if (createdBy) queries.push(where("createdBy", "==", createdBy.id));

    setQuery(queries);

    // If use only Filter dependency is causing loops
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filters.assignee, filters.createdBy, setQuery]);

  const tasks = useMemo(
    () =>
      list.filter(({ title, description }) => {
        const titleMatch = title
          .toLowerCase()
          .includes(filters.title.toLowerCase());

        const descriptionMatch = filters.description
          ? description &&
            description
              .toLowerCase()
              .includes(filters.description.toLowerCase())
          : true;

        return titleMatch && descriptionMatch;
      }),
    [filters.title, filters.description, list]
  );

  return (
    <TaskContext.Provider
      value={{ tasks, taskFilterForm, isFiltersOpen, setIsFiltersOpen }}
    >
      {children}
    </TaskContext.Provider>
  );
}
