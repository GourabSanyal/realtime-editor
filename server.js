// const { application } = require("express");
const express = require("express");
const app = express();
const http = require("http");
const cors = require("cors");
// const { Server } = require("socket.io");

app.use(cors());

const PORT = process.env.PORT || 5000;

const server = app.listen(PORT, () => console.log(`Listening on ${PORT}`));

let io = require("socket.io")(server, {
  cors: {
    origin: "https://localhost:3000",
    methods: ["GET", "POST"],
  },
});

io.on("connect", (socket) => {
  console.log("socket connected", socket.id);

  socket.on("disconnect", (socket) => {
    console.log("user disconnected", socket.id);
  });
});
