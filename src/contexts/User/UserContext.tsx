import { IUserContext } from "@/contexts/User/types";
import useCollection from "@/hooks/firestore/useCollection";
import { auth } from "@/providers/firebase";
import { userProvider as fbUserProvider } from "@/providers/firestore/user";
import { User as GoogleUser } from "firebase/auth";
import { ReactNode, createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export const UserContext = createContext({} as IUserContext);

export default function UserProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<IUser | null>(null);
  const { list: users } = useCollection<IUser>("users");

  const navigate = useNavigate();

  const validateGoogleUser = async (gUser: GoogleUser): Promise<IUser> => {
    const { uid, displayName, email, photoURL } = gUser;

    if (!displayName || !email)
      throw new Error("The Google User must have a display name and email.");

    const dbUser =
      users.find((it) => it.id === uid) ||
      (await fbUserProvider.find(gUser.uid).catch(() => null));

    if (dbUser) {
      await fbUserProvider.update(
        { lastOnlineStatus: new Date().getTime() },
        dbUser.id
      );
      return dbUser;
    }

    const created = await fbUserProvider.create(
      {
        name: displayName,
        email,
        photoURL,
        lastOnlineStatus: new Date().getTime(),
        createdAt: new Date().getTime(),
      },
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

  const logOut = async () => {
    return auth.signOut();
  };

  useEffect(() => {
    auth.onAuthStateChanged(onAuthStateChanged);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!user) return;
    const interval = setInterval(
      async () => {
        await fbUserProvider.update(
          { lastOnlineStatus: new Date().getTime() },
          user.id
        );
      },
      1000 * 60 // 1 minute
    );
    return () => clearInterval(interval);
  }, [user]);

  return (
    <UserContext.Provider
      value={{ user, setUser, users, validateGoogleUser, logOut }}
    >
      {children}
    </UserContext.Provider>
  );
}
