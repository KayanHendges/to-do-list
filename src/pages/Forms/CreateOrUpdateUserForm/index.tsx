import TextInput from "@/components/Inputs/Text";
import { CreateOrUpdatePrayerFormSchema } from "@/pages/Forms/CreateOrUpdateUserForm/CreateOrUpdateUserFormSchema";
import { joiResolver } from "@hookform/resolvers/joi";
import { ComponentProps } from "react";
import { useForm } from "react-hook-form";
import { twMerge } from "tailwind-merge";

interface Props extends ComponentProps<"form"> {
  id?: string;
  user?: Partial<ICreateOrUpdateUserForm>;
}

export default function CreateOrUpdateUserForm({
  user,
  className,
  ...props
}: Props) {

  const form = useForm<ICreateOrUpdateUserForm>({
    resolver: joiResolver(CreateOrUpdatePrayerFormSchema),
    values: user
      ? {
          name: user.name || "",
          email: user.email || "",
        }
      : undefined,
  });

  return (
    <form className={twMerge("flex flex-col", className)} {...props}>
      <TextInput label="Nome" {...form.register("name")} />
      <TextInput label="Email" {...form.register("email")} disabled />
    </form>
  );
}
