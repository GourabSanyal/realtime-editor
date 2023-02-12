// const { application } = require("express");
const express = require("express");
const app = express();
const http = require("http");
const cors = require("cors");
const ACTIONS = require("./src/actions/Actions");
// const { Server } = require("socket.io");

app.use(cors());

const PORT = process.env.PORT || 5000;

const server = app.listen(PORT, () => console.log(`Listening on ${PORT}`));

const io = require("socket.io")(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});

const userSocketMap = [];

function getAllConnectedClients(roomId) {
  Array.from(
    io.sockets.adapter.rooms.get(roomId) ||
      [].map((socketId) => {
        return {
          socketId,
          username: userSocketMap[socketId],
        };
      })
  );
}

io.on("connect", (socket) => {
  console.log("socket connected", socket.id);

  socket.on(ACTIONS.JOIN, ({ roomId, username }) => {
    userSocketMap[socket.id] = username;
    socket.join(roomId);
    const clients = getAllConnectedClients(roomId);
    console.log("clients", clients);
  });
});
