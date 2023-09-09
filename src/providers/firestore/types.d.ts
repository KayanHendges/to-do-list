import { DocumentData } from "firebase/firestore";

interface FirestoreEntity extends DocumentData {
  id: string;
}
