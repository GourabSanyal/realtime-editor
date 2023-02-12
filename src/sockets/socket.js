import { io } from "socket.io-client";

export const initSocket = async () => {
  const options = {
    // retries: 3,
    // ackTimeout: 10000,
    // transports: ["websocket"],
    // reconnectionAttemot: "Infinity",
    withCredentials: true,
    extraHeaders: {
      "my-custom-header": "abcd",
    },
  };

  return io(process.env.REACT_APP_BACKEND_URL, { options });
};
