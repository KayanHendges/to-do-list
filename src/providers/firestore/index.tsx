import { db } from "@/providers/firebase";
import {
  CreatePayload,
  FirestoreEntity,
  StreamDocProps,
  StreamListProps,
  UpdatePayload,
} from "@/providers/firestore/types";
import {
  addDoc,
  doc,
  getDoc,
  setDoc,
  collection,
  onSnapshot,
  query,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";

export class FireStoreProvider<Entity extends FirestoreEntity> {
  constructor(private documentCollection: string) {}

  private docNotFoundError = (docId: string) =>
    new Error(
      `Doc ${docId} not found on ${this.documentCollection} collection.`
    );

  find = async (docId: string) => {
    const docRef = doc(db, this.documentCollection, docId);
    const response = await getDoc(docRef);
    const data = response.data();

    if (!data) throw this.docNotFoundError(docId);

    return { ...data, id: docId } as Entity;
  };

  create = async (
    payload: CreatePayload<Entity>,
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

  update = async (payload: UpdatePayload<Entity>, docId: string) => {
    const docRef = doc(db, this.documentCollection, docId);
    await updateDoc(docRef, payload);
  };

  streamDoc = ({ callback, onError, docId }: StreamDocProps<Entity>) => {
    const docRef = doc(db, this.documentCollection, docId);

    return onSnapshot(
      docRef,
      (doc) => {
        if (!doc.exists) {
          onError && onError(this.docNotFoundError(docId));
          return;
        }

        return callback({ ...doc.data(), id: docId } as Entity);
      },
      onError
    );
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

  delete = async (docId: string) => {
    const docRef = doc(db, this.documentCollection, docId);
    await deleteDoc(docRef);
  };
}
