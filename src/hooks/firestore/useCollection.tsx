import { FireStoreProvider } from "@/providers/firestore";
import { FirestoreEntity } from "@/providers/firestore/types";
import { FirestoreError, QueryConstraint } from "firebase/firestore";
import { useEffect, useState } from "react";

export default function useCollection<Entity extends FirestoreEntity>(
  collection: string
) {
  const [query, setQuery] = useState<QueryConstraint[]>([]);
  const [list, setList] = useState<Entity[] | null>([]);
  const [error, setError] = useState<FirestoreError | null>(null);

  useEffect(() => {
    const firestoreProvider = new FireStoreProvider<Entity>(collection);
    const unsubscribe = firestoreProvider.streamList({
      callback: setList,
      onError: setError,
      fsQuery: query,
    });

    return () => unsubscribe();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [collection, query]);

  return {
    list: list || [],
    isLoading: list === null && !error,
    error,
    setQuery,
  };
}
