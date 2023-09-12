import { FireStoreProvider } from "@/providers/firestore";
import { FirestoreEntity } from "@/providers/firestore/types";
import { FirestoreError } from "firebase/firestore";
import { useEffect, useState } from "react";

export default function useDoc<Entity extends FirestoreEntity>(
  collection: string,
  docId: string
) {
  const [doc, setDoc] = useState<Entity | null>(null);
  const [error, setError] = useState<FirestoreError | Error | null>(null);

  useEffect(() => {
    const firestoreProvider = new FireStoreProvider<Entity>(collection);
    const unsubscribe = firestoreProvider.streamDoc({
      docId,
      callback: setDoc,
      onError: setError,
    });

    return () => unsubscribe();
  }, [collection, docId]);

  return { doc, isLoading: doc === null && !error, error };
}
