import Button from "@/components/Buttons/Button";
import { UserContext } from "@/contexts/UserContext";
import { auth, googleProvider } from "@/providers/firebase";
import { signInWithPopup } from "firebase/auth";
import { useContext } from "react";
import { twMerge } from "tailwind-merge";

export default function LoginPage() {
  const { validateGoogleUser } = useContext(UserContext);

  const handleGoogleLogin = async () => {
    try {
      const { user } = await signInWithPopup(auth, googleProvider);
      validateGoogleUser(user);
    } catch (error) {
      console.log(error);
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
        <h2>Seja bem-vindo!</h2>
        <Button primary onClick={handleGoogleLogin}>
          Entre com o Google
        </Button>
      </div>
    </div>
  );
}
