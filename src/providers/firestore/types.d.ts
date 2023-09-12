import { DocumentData } from "firebase/firestore";

interface FirestoreEntity extends DocumentData {
  id: string;
}

interface StreamProps<T> {
  callback: (payload: T) => void;
  onError?: (err: FirestoreError | Error) => void;
}

interface StreamListProps<Entity extends FirestoreEntity>
  extends StreamProps<Entity[]> {
  fsQuery?: QueryConstraint[];
}

interface StreamDocProps<Entity extends FirestoreEntity>
  extends StreamProps<Entity> {
  docId: string;
}

type CreatePayload<Entity extends FirestoreEntity> = Omit<Entity, "id">;

type UpdatePayload<Entity extends FirestoreEntity> = Partial<
  CreatePayload<Entity>
>;
