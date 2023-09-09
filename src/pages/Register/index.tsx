import CreateOrUpdateUserForm from "@/pages/Forms/CreateOrUpdateUserForm";
import { twMerge } from "tailwind-merge";

export default function RegisterPage() {
  return (
    <div
      className={twMerge(
        "w-full h-full flex justify-center items-center",
        "bg-zinc-200"
      )}
    >
      <div className={twMerge("p-4 rounded-lg bg-zinc-50")}>
        <CreateOrUpdateUserForm />
      </div>
    </div>
  );
}
