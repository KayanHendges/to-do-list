import { Profile } from "@/components/Profile";
import SingleSelect, {
  SelectPlacement,
} from "@/components/Selects/SingleSelect";
import { UserContext } from "@/contexts/User/UserContext";
import { ComponentProps, useContext } from "react";
import { twMerge } from "tailwind-merge";

interface UserProps {
  onUserSelect?: (user: IUser) => void;
}

interface Props extends ComponentProps<"div">, UserProps {
  placement?: SelectPlacement;
  selected?: IUser | string | null;
  label?: string;
}

interface UserItemProps extends ComponentProps<"div"> {
  user: IUser;
  hoverEffect?: boolean;
}

const UserItem = ({
  user,
  hoverEffect = false,
  className,
  ...props
}: UserItemProps) => {
  return (
    <Profile.Root
      className={twMerge("p-0", className)}
      userId={user.id}
      {...props}
    >
      <Profile.Avatar size="sm" />
      <Profile.Content>
        <Profile.Name className={hoverEffect ? "group-hover:text-white" : ""} />
      </Profile.Content>
    </Profile.Root>
  );
};

export default function UsersField({
  selected,
  onUserSelect,
  label,
  placement,
  ...props
}: Props) {
  const { users } = useContext(UserContext);
  const selectedUser =
    typeof selected === "string"
      ? users.find((it) => it.id === selected)
      : selected;

  return (
    <SingleSelect.Root {...props}>
      <SingleSelect.Label>{label}</SingleSelect.Label>
      <SingleSelect.Input>
        {selectedUser && <UserItem user={selectedUser} />}
      </SingleSelect.Input>
      <SingleSelect.Menu placement={placement}>
        {users.map((user) => (
          <SingleSelect.Item
            key={user.id}
            className="group"
            onClick={() => onUserSelect && onUserSelect(user)}
          >
            <UserItem user={user} hoverEffect />
          </SingleSelect.Item>
        ))}
      </SingleSelect.Menu>
    </SingleSelect.Root>
  );
}
