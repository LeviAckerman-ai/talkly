type User = {
  id: string;
  username: string;
  createdAt: string;
  updatedAt: string;
};

export interface AuthStore {
  user: User | null;
  setUser: (user: User) => void;
  removeUser: () => void;
}
