import { FireStoreProvider } from "@/providers/firestore";
import { FirestoreEntity } from "@/providers/firestore/types";
import { FirestoreError, QueryConstraint } from "firebase/firestore";
import { useEffect, useState } from "react";

interface ListOptions {
  query: QueryConstraint[];
}

export default function useCollection<Entity extends FirestoreEntity>(
  collection: string,
  options?: ListOptions
) {
  const [list, setList] = useState<Entity[] | null>([]);
  const [error, setError] = useState<FirestoreError | null>(null);

  useEffect(() => {
    const firestoreProvider = new FireStoreProvider<Entity>(collection);
    const unsubscribe = firestoreProvider.streamList({
      callback: setList,
      onError: setError,
      fsQuery: options?.query,
    });

    return () => unsubscribe();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [collection]);

  return { list: list || [], isLoading: list === null && !error, error };
}
