import Avatar, { AvatarProps } from "@/components/Avatar";
import Button from "@/components/Buttons/Button";
import { Modal } from "@/components/Modal";
import { Heading } from "@/components/Typography/Heading";
import { Text } from "@/components/Typography/Text";
import { UserContext } from "@/contexts/User/UserContext";
import { getShortName } from "@/utils/formats/string";
import { DateTime } from "luxon";
import {
  ComponentProps,
  ComponentPropsWithoutRef,
  createContext,
  useContext,
  useMemo,
  useState,
} from "react";
import { twMerge } from "tailwind-merge";

interface IProfileContext {
  user: IUser;
  isOnline: boolean;
  displayCard: boolean;
  setDisplayCard: (display: boolean) => void;
  lastAccess: string | null;
}

const ProfileContext = createContext({} as IProfileContext);

interface ProfileRootProps extends ComponentProps<"div"> {
  userId: string;
  popUpCard?: boolean;
}

const fallBackUser: IUser = {
  id: "",
  name: "Desconhecido",
  email: "",
  lastOnlineStatus: 0,
  createdAt: 0,
  photoURL: null,
};

function ProfileRoot({
  userId,
  popUpCard = true,
  className,
  children,
  onClick,
  ...props
}: ProfileRootProps) {
  const [displayCard, setDisplayCard] = useState<boolean>(false);
  const { users } = useContext(UserContext);

  const user = useMemo(
    () => users.find((it) => it.id === userId) || fallBackUser,
    [users, userId]
  );

  const isOnline = useMemo(() => {
    const now = new Date().getTime();
    return now - user.lastOnlineStatus < 1000 * 60 * 2; // 2 minutes
  }, [user]);

  const lastAccess = DateTime.fromMillis(user.lastOnlineStatus).toRelative();

  return (
    <ProfileContext.Provider
      value={{
        user,
        isOnline,
        displayCard,
        setDisplayCard,
        lastAccess,
      }}
    >
      <div
        className={twMerge(
          "flex items-center gap-4 p-2",
          popUpCard && "relative cursor-pointer",
          className
        )}
        onClick={(e) => {
          onClick && onClick(e);
          popUpCard && setDisplayCard(true);
        }}
        {...props}
      >
        {children}
      </div>
    </ProfileContext.Provider>
  );
}

interface ProfileAvatarProps extends Omit<AvatarProps, "photoURL"> {}

function ProfileAvatar(props: ProfileAvatarProps) {
  const { user, isOnline } = useContext(ProfileContext);

  return <Avatar isOnline={isOnline} photoURL={user.photoURL} {...props} />;
}

interface ProfileContentProps extends ComponentPropsWithoutRef<"span"> {}

function ProfileContent({
  className,
  children,
  ...props
}: ProfileContentProps) {
  return (
    <div
      className={twMerge(
        "flex flex-1 flex-col items-start truncate",
        className
      )}
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
    <Text className={twMerge("font-bold", className)} truncate {...props}>
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

interface ProfileStatusProps extends ComponentPropsWithoutRef<"span"> {
  format?: (status: string) => string;
}

function ProfileStatus({ format, className, ...props }: ProfileStatusProps) {
  const { isOnline, lastAccess } = useContext(ProfileContext);
  const status = isOnline ? "online" : `online ${lastAccess}`;

  const formatted = format ? format(status) : status;

  return (
    <Text size="sm" className={twMerge(className)} truncate {...props}>
      {formatted}
    </Text>
  );
}

interface ProfileCardProps extends ComponentPropsWithoutRef<"span"> {}

function ProfileCard({ className, ...props }: ProfileCardProps) {
  const { user: loggedUser, logOut } = useContext(UserContext);

  const { user, displayCard, setDisplayCard, isOnline, lastAccess } =
    useContext(ProfileContext);
  const status = isOnline ? "online" : `online há ${lastAccess}`;

  const { name, email, photoURL, createdAt } = user;
  const joined = DateTime.fromMillis(createdAt).toFormat(
    "dd/MM/yyyy HH:mm",
    {}
  );

  const isLoggedUser = user.id === loggedUser?.id;

  if (!displayCard) return <></>;

  return (
    <Modal.Root className={className} size="sm" onClose={() => setDisplayCard(false)}>
      <Modal.Body
        className={twMerge(
          "flex flex-col justify-center items-center gap-4",
        )}
        {...props}
      >
        <Avatar size="xl" photoURL={photoURL} isOnline={isOnline} />
        <div className="flex flex-col text-center">
          <Heading>{name}</Heading>
          {email && <Text size="xl">{email}</Text>}
        </div>
        <Text>{status}</Text>
      </Modal.Body>
      <Modal.Footer>
        <Text>Entrou em {joined}</Text>
        <div className="flex gap-2">
          {isLoggedUser && (
            <Button onClick={() => logOut()}>Sair da conta</Button>
          )}
          <Button primary>Fechar</Button>
        </div>
      </Modal.Footer>
    </Modal.Root>
  );
}

export const Profile = {
  Root: ProfileRoot,
  Avatar: ProfileAvatar,
  Content: ProfileContent,
  Name: ProfileName,
  Email: ProfileEmail,
  Status: ProfileStatus,
  Card: ProfileCard,
};
