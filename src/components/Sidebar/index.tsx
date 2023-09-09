import Avatar from "@/components/Avatar";
import { Heading } from "@/components/Typography/Heading";
import { Text } from "@/components/Typography/Text";
import useCollection from "@/hooks/firestore/useCollection";
import { twMerge } from "tailwind-merge";

export default function Sidebar() {
  const { list: users } = useCollection<IUser>("users");

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
        {users.map(({ id, name, email, photoURL }) => (
          <div
            key={id}
            className={twMerge(
              "flex items-center gap-4 px-4 py-2",
              "hover:bg-zinc-100 cursor-pointer"
            )}
          >
            <Avatar size="sm" photoURL={photoURL || undefined} />
            <div className="flex-1 flex flex-col justify-start truncate">
              <Text truncate>{name}</Text>
              <Text truncate size="sm">
                {email}
              </Text>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
