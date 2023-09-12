interface IUser {
  id: string;
  name: string;
  email: string;
  isOnline: boolean;
  lastOnlineStatus: number;
  photoURL: string | null;
  createdAt: number;
}
