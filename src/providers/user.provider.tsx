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
import { Socket, io } from "socket.io-client";
import { DefaultEventsMap } from "socket.io/dist/typed-events";

type TUserProvider = {
  user: TUser | null;
  setUser: Dispatch<SetStateAction<TUser | null>>;
  userLoading: boolean;
  setUserLoading: Dispatch<SetStateAction<boolean>>;
  onlineUsers: string[];
  setOnlineUser: Dispatch<SetStateAction<string[]>>;

  socket: Socket<DefaultEventsMap, DefaultEventsMap> | null;
  setSocket: Dispatch<
    SetStateAction<Socket<DefaultEventsMap, DefaultEventsMap> | null>
  >;
};

export const UserContext = createContext<TUserProvider | null>(null);

const UserProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<TUser | null>(null);
  const [userLoading, setUserLoading] = useState(true);
  const [onlineUsers, setOnlineUser] = useState<string[]>([]);
  const [socket, setSocket] = useState<Socket<
    DefaultEventsMap,
    DefaultEventsMap
  > | null>(null);

  useEffect(() => {
    const getUser = async () => {
      const user = await getCurrentUser();
      if (user && !socket?.connected) {
        const socket = io("http://localhost:5000", {
          query: {
            userId: user?._id,
          },
        });
        socket.connect();
        setSocket(socket);
        socket.on("getOnlineUsers", (userIds) => {
          setOnlineUser(userIds);
        });
      }
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
    onlineUsers,
    setOnlineUser,
    socket,
    setSocket,
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
