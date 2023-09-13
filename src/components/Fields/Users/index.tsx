import { Profile } from "@/components/Profile";
import SingleSelect, {
  SelectPlacement,
} from "@/components/Selects/SingleSelect";
import { UserContext } from "@/contexts/User/UserContext";
import { ComponentProps, useContext, useMemo, useState } from "react";
import { twMerge } from "tailwind-merge";

interface UserProps {
  onUserSelect?: (user: IUser | null) => void;
}

interface Props extends ComponentProps<"div">, UserProps {
  placement?: SelectPlacement;
  selected?: IUser | string | null;
  notAllowNull?: boolean;
  label?: string;
}

interface UserItemProps extends ComponentProps<"div"> {
  user: IUser;
  selected?: boolean;
  hoverEffect?: boolean;
}

const UserItem = ({
  user,
  hoverEffect = false,
  selected = false,
  className,
  ...props
}: UserItemProps) => {
  return (
    <Profile.Root
      className={twMerge("p-0", className)}
      userId={user.id}
      popUpCard={false}
      {...props}
    >
      <Profile.Avatar size="sm" />
      <Profile.Content>
        <Profile.Name
          className={twMerge(
            hoverEffect && "group-hover:text-white",
            selected && "text-white"
          )}
        />
      </Profile.Content>
    </Profile.Root>
  );
};

export default function UsersField({
  selected,
  onUserSelect,
  label,
  placement,
  notAllowNull,
  ...props
}: Props) {
  const [input, setInput] = useState<string>("");

  const { users } = useContext(UserContext);

  const list = useMemo(
    () =>
      users.filter(({ name }) =>
        name.toLocaleLowerCase().includes(input.toLocaleLowerCase())
      ),
    [input, users]
  );

  const selectedUser =
    typeof selected === "string"
      ? users.find((it) => it.id === selected)
      : selected;

  const handleOnSelect = (user: IUser) => {
    if (!onUserSelect) return;

    if (notAllowNull) return onUserSelect(user);

    return onUserSelect(user.id === selectedUser?.id ? null : user);
  };

  return (
    <SingleSelect.Root {...props}>
      <SingleSelect.Label>{label}</SingleSelect.Label>
      <SingleSelect.Input onInputChanges={setInput}>
        {selectedUser && <UserItem user={selectedUser} />}
      </SingleSelect.Input>
      <SingleSelect.Menu placement={placement}>
        {list.map((user) => {
          const isSelected = user.id === selectedUser?.id;
          return (
            <SingleSelect.Item
              key={user.id}
              className="group"
              selected={isSelected}
              onClick={() => handleOnSelect(user)}
            >
              <UserItem user={user} hoverEffect selected={isSelected} />
            </SingleSelect.Item>
          );
        })}
      </SingleSelect.Menu>
    </SingleSelect.Root>
  );
}
