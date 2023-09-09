import { db } from "@/providers/firebase";
import { FirestoreEntity } from "@/providers/firestore/types";
import {
  addDoc,
  doc,
  getDoc,
  setDoc,
  collection,
  onSnapshot,
  FirestoreError,
  query,
  QueryConstraint,
} from "firebase/firestore";

interface StreamListProps<Entity> {
  callback: (list: Entity[]) => void;
  onError?: (err: FirestoreError) => void;
  fsQuery?: QueryConstraint[];
}

export class FireStoreProvider<Entity extends FirestoreEntity> {
  constructor(private documentCollection: string) {}

  find = async (docId: string) => {
    const docRef = doc(db, this.documentCollection, docId);
    const response = await getDoc(docRef);
    const data = response.data();

    if (!data)
      throw new Error(
        `Doc ${docId} not found on ${this.documentCollection} collection.`
      );

    return { ...data, id: docId } as Entity;
  };

  create = async (
    payload: Omit<Entity, "id">,
    docId?: string
  ): Promise<Entity> => {
    if (docId) {
      const docRef = doc(db, this.documentCollection, docId);
      await setDoc(docRef, payload);
      return { ...payload, id: docId } as Entity;
    }

    const docRef = collection(db, this.documentCollection);
    const created = await addDoc(docRef, payload);

    return { ...payload, id: created.id } as Entity;
  };

  streamList = ({ callback, onError, fsQuery }: StreamListProps<Entity>) => {
    const collectionRef = collection(db, this.documentCollection);
    const docRef = fsQuery ? query(collectionRef, ...fsQuery) : collectionRef;

    return onSnapshot(
      docRef,
      (doc) => {
        const results: Entity[] = [];
        doc.forEach((it) =>
          results.push({ ...it.data(), id: it.id } as Entity)
        );
        callback(results);
      },
      onError
    );
  };
}
