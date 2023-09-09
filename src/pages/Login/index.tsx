import Button from "@/components/Buttons/Button";
import { Heading } from "@/components/Typography/Heading";
import { UserContext } from "@/contexts/User/UserContext";
import { auth, googleProvider } from "@/providers/firebase";
import { signInWithPopup } from "firebase/auth";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { twMerge } from "tailwind-merge";

export default function LoginPage() {
  const { setUser, validateGoogleUser } = useContext(UserContext);
  const navigate = useNavigate();

  const handleGoogleLogin = async () => {
    try {
      const { user: gUser } = await signInWithPopup(auth, googleProvider);
      const dbUser = await validateGoogleUser(gUser);

      setUser(dbUser);
      navigate("/");
    } catch (error) {
      // TO DO handle error
      setUser(null);
      console.error(error);
    }
  };

  return (
    <div
      className={twMerge(
        "flex-1 h-full flex justify-center items-center",
        "bg-zinc-200"
      )}
    >
      <div
        className={twMerge(
          "w-full max-w-[400px] flex flex-col items-center gap-1",
          "bg-zinc-50 p-4 rounded-lg prose"
        )}
      >
        <Heading>Seja bem-vindo!</Heading>
        <Button primary onClick={handleGoogleLogin}>
          Entre com o Google
        </Button>
      </div>
    </div>
  );
}
