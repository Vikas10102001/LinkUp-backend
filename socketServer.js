const { Server } = require("socket.io");
const verifyTokenSocket = require("./controller/socketAuthController");
const { newConnectionHandler } = require("./controller/socketController");
const { removeDisconnectedUser } = require("./serverStore");

const registerSocketServer = (server) => {
  const io = new Server(server, {
    cors: {
      origin: "*",
      methods: ["POST", "GET"],
    },
  });

  io.use((socket, next) => {
    verifyTokenSocket(socket, next);
  });

  io.on("connection", (socket) => {
    newConnectionHandler(socket);
    socket.on("disconnect", () => {
      removeDisconnectedUser(socket.id);
    });
  });
};

module.exports = registerSocketServer;
