"use client";

import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from "react";
import { getCurrentUser } from "../services/auth";
import { TUser } from "../types";

type TUserProvider = {
  user: TUser | null;
  setUser: Dispatch<SetStateAction<TUser | null>>;
  userLoading: boolean;
  setUserLoading: Dispatch<SetStateAction<boolean>>;
};

export const UserContext = createContext<TUserProvider | null>(null);

const UserProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<TUser | null>(null);
  const [userLoading, setUserLoading] = useState(true);

  useEffect(() => {
    const getUser = async () => {
      const user = await getCurrentUser();
      setUser(user);
      setUserLoading(false);
    };
    getUser();
  }, [userLoading]);

  const userData = {
    user,
    setUser,
    userLoading,
    setUserLoading,
  };
  return (
    <UserContext.Provider value={userData}>{children}</UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("user only accessible with in user context");
  }
  return context;
};

export default UserProvider;
