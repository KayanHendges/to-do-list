import Avatar, { AvatarProps } from "@/components/Avatar";
import { Text } from "@/components/Typography/Text";
import { UserContext } from "@/contexts/User/UserContext";
import { getShortName } from "@/utils/formats/string";
import {
  ComponentProps,
  ComponentPropsWithoutRef,
  createContext,
  useContext,
  useMemo,
} from "react";
import { twMerge } from "tailwind-merge";

interface IProfileContext {
  user: IUser;
}

const ProfileContext = createContext({} as IProfileContext);

interface ProfileRootProps extends ComponentProps<"div"> {
  userId: string;
}

const fallBackUser: IUser = {
  id: "",
  name: "Desconhecido",
  email: "",
  isOnline: false,
  lastOnlineStatus: 0,
  createdAt: 0,
  photoURL: null,
};

function ProfileRoot({ userId, className, ...props }: ProfileRootProps) {
  const { users } = useContext(UserContext);

  const user = useMemo(
    () => users.find((it) => it.id === userId) || fallBackUser,
    [users, userId]
  );

  return (
    <ProfileContext.Provider value={{ user }}>
      <div
        className={twMerge(
          "flex items-center gap-4 px-4 py-2 cursor-pointer",
          className
        )}
        {...props}
      ></div>
    </ProfileContext.Provider>
  );
}

interface ProfileAvatarProps extends Omit<AvatarProps, "photoURL"> {}

function ProfileAvatar(props: ProfileAvatarProps) {
  const { user } = useContext(ProfileContext);

  return <Avatar photoURL={user.photoURL} {...props} />;
}

interface ProfileContentProps extends ComponentPropsWithoutRef<"span"> {}

function ProfileContent({
  className,
  children,
  ...props
}: ProfileContentProps) {
  return (
    <div
      className={twMerge("flex flex-col items-start truncate", className)}
      {...props}
    >
      {children}
    </div>
  );
}

interface ProfileNameProps extends ComponentPropsWithoutRef<"span"> {
  shortName?: boolean;
  format?: (name: string) => string;
}

function ProfileName({
  shortName,
  format,
  className,
  ...props
}: ProfileNameProps) {
  const { user } = useContext(ProfileContext);

  const name = shortName ? getShortName(user.name) : user.name;
  const formatted = format ? format(name) : name;

  return (
    <Text className={twMerge(className)} truncate {...props}>
      {formatted}
    </Text>
  );
}

interface ProfileEmailProps extends ComponentPropsWithoutRef<"span"> {
  format?: (name: string) => string;
}

function ProfileEmail({ format, className, ...props }: ProfileEmailProps) {
  const { user } = useContext(ProfileContext);
  const formatted = format ? format(user.email) : user.email;

  return (
    <Text size="sm" className={twMerge(className)} truncate {...props}>
      {formatted}
    </Text>
  );
}

export const Profile = {
  Root: ProfileRoot,
  Avatar: ProfileAvatar,
  Content: ProfileContent,
  Name: ProfileName,
  Email: ProfileEmail,
};
