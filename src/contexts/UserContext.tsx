import { IUserContext } from "@/contexts/types";
import { auth } from "@/providers/firebase";
import { userProvider as fbUserProvider } from "@/providers/firestore/user";
import { User as GoogleUser } from "firebase/auth";
import { ReactNode, createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export const UserContext = createContext({} as IUserContext);

export default function UserProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<IUser | null>(null);
  const [googleUser, setGoogleUser] = useState<GoogleUser | null>(null);

  const navigate = useNavigate();

  const validateGoogleUser = async (gUser: GoogleUser | null) => {
    setGoogleUser(gUser);

    if (!gUser) return navigate("login");
    const dbUser = await fbUserProvider.find(gUser.uid).catch(() => null);
    setUser(dbUser);

    if (!dbUser) return navigate("register");
  };

  useEffect(() => {
    auth.onAuthStateChanged(validateGoogleUser);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <UserContext.Provider value={{ user, googleUser, validateGoogleUser }}>
      {children}
    </UserContext.Provider>
  );
}
