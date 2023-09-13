import { Profile } from "@/components/Profile";
import { Heading } from "@/components/Typography/Heading";
import { UserContext } from "@/contexts/User/UserContext";
import { useContext } from "react";

export default function Header() {
  const { user } = useContext(UserContext);

  return (
    <div className="w-ful h-16  flex px-4 justify-between items-center bg-primary">
      <Heading className="text-white">
        <b>TO DO LIST</b>
      </Heading>
      {user && (
        <div className="flex items-center gap-2">
          <Profile.Root userId={user.id}>
            <Profile.Content>
              <Profile.Name shortName className="text-white font-bold" />
            </Profile.Content>
            <Profile.Avatar size="sm" className="border" />
            <Profile.Card />
          </Profile.Root>
        </div>
      )}
    </div>
  );
}
