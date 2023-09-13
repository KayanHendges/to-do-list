import { User as GoogleUser } from "firebase/auth";
import { Dispatch, SetStateAction } from "react";

interface IUserContext {
  user: IUser | null;
  users: IUser[];
  setUser: Dispatch<SetStateAction<IUser | null>>;
  validateGoogleUser: (user: GoogleUser) => Promise<IUser>;
  logOut: () => void;
}
