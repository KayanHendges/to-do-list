import { db } from "@/providers/firebase";
import { DocumentData, doc, getDoc } from "firebase/firestore";

export class FireStoreProvider<Entity extends DocumentData> {
  constructor(private collection: string) {}

  find = async (docId: string) => {
    const docRef = doc(db, this.collection, docId);
    const response = await getDoc(docRef);
    const data = response.data();

    if (!data)
      throw new Error(
        `Doc ${docId} not found on ${this.collection} collection.`
      );

    return data as Entity;
  };
}
