import {
  createContext,
  Dispatch,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from "react";
import { io, Socket } from "socket.io-client";
import { getCurrentUser } from "../services/auth";
import { DefaultEventsMap } from "socket.io/dist/typed-events";

type TSocketProvider = {
  onlineUsers: string[];
  setOnlineUser: Dispatch<SetStateAction<string[]>>;
  socket: Socket<DefaultEventsMap, DefaultEventsMap> | null;
  setSocket: Dispatch<
    SetStateAction<Socket<DefaultEventsMap, DefaultEventsMap> | null>
  >;
};

export const SocketContext = createContext<TSocketProvider | null>(null);

export const SocketProvider = ({ children }: { children: React.ReactNode }) => {
  const [socket, setSocket] = useState<Socket | null>(null);
  const [onlineUsers, setOnlineUser] = useState<string[]>([]);

  useEffect(() => {
    const connectSocket = async () => {
      const user = await getCurrentUser();
      if (user && !socket?.connected) {
        const newSocket = io("http://localhost:5000", {
          query: {
            userId: user?._id,
          },
        });
        newSocket.connect();
        setSocket(newSocket);
        newSocket.on("getOnlineUsers", (userIds) => {
          setOnlineUser(userIds);
        });
        return () => {
          newSocket.disconnect();
        };
      }
    };
    connectSocket();
  }, []);
  const socketInfo = {
    socket,
    setSocket,
    onlineUsers,
    setOnlineUser,
  };

  return (
    <SocketContext.Provider value={socketInfo}>
      {children}
    </SocketContext.Provider>
  );
};

export const useSocket = () => {
  const context = useContext(SocketContext);
  if (!context) {
    throw new Error("socket only accessible with in user context");
  }
  return context;
};
