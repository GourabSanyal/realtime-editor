import { io } from "socket.io-client";

export const initSocket = async () => {
  const options = {
    retries: 3,
    ackTimeout: 10000,
    transports: ["websocket"],
  };

  io.connect("https://localhost:5000", { options });
};
