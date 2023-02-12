// const { application } = require("express");
const express = require("express");
const app = express();
const http = require("http");
const cors = require("cors");
const ACTIONS = require("./src/actions/Actions");
const { Server } = require("socket.io");

app.use(cors());

const PORT = process.env.PORT || 5000;

const server = http.createServer(app);

const io = new Server(server, {
  // cors: {
  //   origin: "http://localhost:3000",
  //   methods: ["GET", "POST"],
  // },
});

const userSocketMap = [];

function getAllConnectedClients(roomId) {
  return Array.from(io.sockets.adapter.rooms.get(roomId) || []).map(
    (socketId) => {
      return {
        socketId,
        username: userSocketMap[socketId],
      };
    }
  );
}

io.once("connection", (socket) => {
  console.log("socket connected", socket.id);

  socket.on(ACTIONS.JOIN, (roomId, username) => {
    userSocketMap[socket.id] = username;

    socket.join(roomId);
    const clients = getAllConnectedClients(roomId);
    console.log("clients", clients);

    socket.on("disconnect", () => {
      console.log("socket disconnected", socket.id);
      delete userSocketMap[socket.id];
    });

    socket.on("error", (error) => {
      console.error("socket error", error);
    });
  });
  console.log("clients", getAllConnectedClients());
});

server.listen(PORT, () => console.log(`Listening on ${PORT}`));
