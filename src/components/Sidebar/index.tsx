import { Profile } from "@/components/Profile";
import { Heading } from "@/components/Typography/Heading";
import { UserContext } from "@/contexts/User/UserContext";
import { useContext } from "react";
import { twMerge } from "tailwind-merge";

export default function Sidebar() {
  const { users, user } = useContext(UserContext);

  const list = users.filter((it) => it.id !== user?.id);

  return (
    <div
      className={twMerge(
        "w-[25vw] max-w-[400px] min-w-[200px] h-full flex flex-col pt-4 gap-4",
        "border-l-[1px] border-zinc-200 bg-zinc-50"
      )}
    >
      <Heading className="text-center" size="lg">
        Usuários
      </Heading>
      <div className="w-full flex-1 max-h-full flex flex-col gap-2 overflow-y-auto">
        {list.map(({ id }) => (
          <Profile.Root key={id} userId={id}>
            <Profile.Avatar size="md" />
            <Profile.Content>
              <Profile.Name shortName />
              <Profile.Email />
            </Profile.Content>
          </Profile.Root>
        ))}
      </div>
    </div>
  );
}
