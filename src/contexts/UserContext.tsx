import { IUserContext } from "@/contexts/types";
import { auth } from "@/providers/firebase";
import { userProvider as fbUserProvider } from "@/providers/firestore/user";
import { User as GoogleUser } from "firebase/auth";
import { ReactNode, createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export const UserContext = createContext({} as IUserContext);

export default function UserProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<IUser | null>(null);

  const navigate = useNavigate();

  const validateGoogleUser = async (gUser: GoogleUser): Promise<IUser> => {
    const { uid, displayName, email } = gUser;

    if (!displayName || !email)
      throw new Error("The Google User must have a display name and email.");

    const dbUser = await fbUserProvider.find(gUser.uid).catch(() => null);

    if (dbUser) return dbUser;

    const created = await fbUserProvider.create(
      { name: displayName, email },
      uid
    );

    return created;
  };

  const onAuthStateChanged = async (gUser: GoogleUser | null) => {
    try {
      if (!gUser) throw new Error("Not authenticated.");

      const dbUser = await validateGoogleUser(gUser);
      setUser(dbUser);
    } catch (error) {
      // TO DO handle error
      setUser(null);
      navigate("login");
      console.error(error);
    }
  };

  useEffect(() => {
    auth.onAuthStateChanged(onAuthStateChanged);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser, validateGoogleUser }}>
      {children}
    </UserContext.Provider>
  );
}
