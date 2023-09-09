import { db } from "@/providers/firebase";
import {
  DocumentData,
  addDoc,
  doc,
  getDoc,
  setDoc,
  collection,
} from "firebase/firestore";

export class FireStoreProvider<Entity extends DocumentData & { id: string }> {
  constructor(private documentCollection: string) {}

  find = async (docId: string) => {
    const docRef = doc(db, this.documentCollection, docId);
    const response = await getDoc(docRef);
    const data = response.data();

    if (!data)
      throw new Error(
        `Doc ${docId} not found on ${this.documentCollection} collection.`
      );

    return data as Entity;
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
}
