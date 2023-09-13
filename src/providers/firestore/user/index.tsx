import { FireStoreProvider } from "@/providers/firestore";

class UserProvider extends FireStoreProvider<IUser> {
  constructor() {
    super("users");
  }
}

export const userProvider = new UserProvider();
