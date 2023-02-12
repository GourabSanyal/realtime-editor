const express = require("express");
const app = express();
const http = require("http");
const { Server } = require("socket.io");

const server = http.createServer(app);
const io = new Server(http, {
  allowRequest: (req, callback) => {
    const noOriginHeader = req.headers.origin === undefined;
    callback(null, noOriginHeader);
  },
  cors: {
    origin: "https://localhost:3000",
    methods: ["GET", "POST"],
    allowedHeaders: ["my-custom-header"],
    credentials: true,
  },
});

io.on("connection", (socket) => {
  console.log("socket connected", socket.id);
});

const PORT = process.env.PORT || 5000;

server.listen(PORT, () => console.log(`Listening on port ${PORT}`));
