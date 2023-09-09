import { User as GoogleUser } from "firebase/auth";

interface IUserContext {
  user: IUser | null;
  googleUser: GoogleUser | null
  validateGoogleUser: (user: GoogleUser | null ) => Promise<void>
}
