import { io } from "socket.io-client";

export const connectSocket = (_id: string) => {
  const socket = io("http://localhost:5000", {
    query: {
      userId: _id,
    },
  });
  socket.connect();
};
export const disconnectSocket = () => {
  const socket = io("http://localhost:5000");
  socket.disconnect();
};
