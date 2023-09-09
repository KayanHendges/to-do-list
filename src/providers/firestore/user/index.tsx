import { FireStoreProvider } from "@/providers/firestore";
import { doc } from "firebase/firestore";
import { db } from "@/providers/firebase";

class UserProvider extends FireStoreProvider<IUser> {
  constructor() {
    super("users");
  }

  handlePresence = (userId: string) => {
    const docRef = doc(db, "users", userId);
    docRef.id
  };
}

export const userProvider = new UserProvider();
